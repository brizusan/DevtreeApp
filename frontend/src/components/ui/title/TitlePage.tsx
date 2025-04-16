type Props = {
  title: string;
  subtitle?: string;
};

export const TitlePage = ({ title, subtitle }: Props) => {
  return (
    <div>
      <h1 className="text-center text-3xl antialiased text-slate-100 capitalize font-semibold tracking-wide">
        {title}
      </h1>
      <span className="block text-center my-2 text-slate-300 text-sm ">
        {subtitle}
      </span>
    </div>
  );
};
