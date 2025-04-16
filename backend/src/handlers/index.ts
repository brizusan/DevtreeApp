import { Request, Response } from "express";
import formidable from "formidable";
import slug from "slug";
import { v4 as uuid } from "uuid";
import cloudinary from "../config/cloudinary";
import { comparePassword, hashPassword } from "../lib";
import { generateToken } from "../lib/jwt";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
  const { fullName, email, password, handle } = req.body;

  // verificar si el usuario ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // verificar que el alias se encuentre disponible
  const handleUser = slug(handle, "");
  const handleExist = await User.findOne({ handle: handleUser });
  if (handleExist) {
    res.status(409).json({ message: "Alias already exists" });
    return;
  }

  try {
    const user = new User({ fullName, email, password });
    const hashedPassword = await hashPassword(password);
    user.handle = handleUser;
    user.password = hashedPassword;
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // verificar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  try {
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const token = generateToken({ id: user._id });
    res.status(200).json({ message: "Logged in successfully", token });

    // res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user = req.user;
  res.status(200).json(user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const { handle, description, links } = req.body;
  const handleUser = slug(handle, "");
  const handleExist = await User.findOne({ handle: handleUser });
  if (handleExist && handleExist._id.toString() !== req.user._id.toString()) {
    res.status(409).json({ message: "Alias already exists" });
    return;
  }
  try {
    req.user.handle = handleUser;
    req.user.description = description;
    req.user.links = links;
    await req.user.save();
    res.status(200).json({ message: "Profile updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({ multiples: true });
  try {
    form.parse(req, async (err, fields, files) => {
      cloudinary.uploader.upload(
        files.file[0].filepath,
        { public_id: uuid() },
        async function (err, result) {
          if (err) {
            res.status(500).json({ message: "Error uploading image" });
            return;
          }

          if (result) {
            req.user.image = result.secure_url;
            await req.user.save();
            res.json(result.secure_url);
          }
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image" });
  }
};

export const getUserByHandle = async (req: Request, res: Response) => {
  const { handleUser } = req.params;
  const user = await User.findOne({ handle: handleUser }).select(
    "-password -_id -__v -email -createdAt -updatedAt"
  );
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
};

export const searchHandler = async (req: Request, res: Response) => {
  const { handle } = req.body;

  try {
    const user = await User.findOne({ handle });

    if (user) {
      res.status(404).json({ message: "Alias user not avaliable" });
      return;
    }

    res.status(200).json({ message: "Alias user avaliable" });
  } catch (error) {
    res.status(500).json({ message: "Error searching user" });
  }
};
