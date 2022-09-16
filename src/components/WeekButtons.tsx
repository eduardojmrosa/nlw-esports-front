interface WeekButtonsProps {
  title: string;
  content: string;
}
export function WeekButtons(props: WeekButtonsProps) {
  return (
    <button
      className="w-8 h-8 rounded hover:bg-violet-500 bg-zinc-900"
      title={props.title}
    >
      {props.content}
    </button>
  );
}
{
  weekDays.map((day) => {
    return <WeekButtons title={day.title} content={day.content} />;
  });
}
