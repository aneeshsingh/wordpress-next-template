interface DateProps {
  dateString: string;
}

export default function Articledate({ dateString }: DateProps) {
  if (!dateString) {
    return null; // Gracefully handle missing dateString
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return null; // Gracefully handle invalid dateString
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  return <time dateTime={dateString}>{formattedDate}</time>;
}
