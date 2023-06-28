import { API_KEY } from "@env";

// filter last week games by metacritic
const currentDate = new Date();
const oneWeekAgo = new Date();
oneWeekAgo.setDate(currentDate.getDate() - 7);
const currentDateStr = currentDate.toISOString().slice(0, 10);
const oneWeekAgoStr = oneWeekAgo.toISOString().slice(0, 10);
const minMetacriticScore = 80;
const weeklyUrl = `https://api.rawg.io/api/games?key=${API_KEY}&dates=${oneWeekAgoStr},${currentDateStr}&metacritic=${minMetacriticScore}-`;

// filter popular upcoming games
const futureDate = new Date();
futureDate.setFullYear(currentDate.getFullYear() + 1); // Set the future date as one year from the current date
const futureDateStr = futureDate.toISOString().slice(0, 10);
const upcomingUrl = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-added&dates=${currentDateStr},${futureDateStr}`;

export default requests = {
  weekly: weeklyUrl,
  upcoming: upcomingUrl,
};
