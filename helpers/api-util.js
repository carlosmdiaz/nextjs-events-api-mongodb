export async function getAllEvents() {
  const response = await fetch('https://nextjs-course-2-fc7dd-default-rtdb.firebaseio.com/events.json');
  const data = await response.json();
  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  console.log(await getAllEvents());
  const allEvents = await getAllEvents();
  console.log(allEvents);
  return allEvents.filter((event) => event.isFeature);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export function 