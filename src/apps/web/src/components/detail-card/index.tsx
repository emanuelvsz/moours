interface Props {
  icon: React.ReactNode;
  title: string;
  value: string | React.ReactNode;
}

const DetailCard = ({ icon, title, value }: Props) => (
  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors">
    <div className="text-emerald-500 mr-4 mt-1 flex-shrink-0">{icon}</div>
    <div>
      <p className="text-xs font-bold uppercase text-slate-500 tracking-wider">
        {title}
      </p>
      <p className="text-base text-slate-800 font-medium break-words mt-0.5">
        {value}
      </p>
    </div>
  </div>
);

export default DetailCard;
