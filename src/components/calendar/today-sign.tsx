const TodaySign: React.FC<{}> = (props) => {
  return (
    <div
      id="today-sign"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg transition-bg w-full h-full flex border-4 border-slate-800 dark:border-slate-100 dark-hover"
    >
      <p className="text-slate-100 dark:text-slate-800 bg-slate-800 dark:bg-slate-100 font-caveat h-min mt-auto w-full transition-bg">
        Today
      </p>
    </div>
  );
};

export default TodaySign;
