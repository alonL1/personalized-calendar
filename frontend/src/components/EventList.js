export default function EventList({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Suggested Events:</h2>
      <ul className="space-y-2">
        {events.map((event, index) => (
          <li key={index} className="p-2 border rounded">
            <strong>{event.name}</strong><br />
            {event.description}<br />
            <em>{event.date}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}