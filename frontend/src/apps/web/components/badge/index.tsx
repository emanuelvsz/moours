interface Props {
  children: React.ReactNode;
  color?: string;
}

const Badge = ({ children, color = "blue" }: Props) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    red: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
        colors[color] || colors.blue
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;
