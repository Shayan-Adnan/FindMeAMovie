export const questionList = [
  {
    id: "Genres",
    question: "What genres are you interested in?",
    options: [
      { name: "Action", value: 28 },
      { name: "Adventure", value: 12 },
      { name: "Animation", value: 16 },

      { name: "Comedy", value: 35 },
      { name: "Crime", value: 80 },
      { name: "Drama", value: 18 },
      { name: "Family", value: 10751 },
      { name: "Fantasy", value: 14 },
      { name: "Horror", value: 27 },
      { name: "Music", value: 10402 },
      { name: "Mystery", value: 9648 },
      { name: "Sci Fi", value: 878 },
      { name: "Thriller", value: 53 },
      { name: "TV Movie", value: 10770 },
      { name: "War", value: 10752 },
      { name: "Anything", value: "" },
    ],
  },
  {
    id: "Eras",
    question: "What eras do you want to explore?",
    options: [
      { name: "2020s", value: { start: "2020-01-01", end: "2029-12-31" } },
      { name: "2010s", value: { start: "2010-01-01", end: "2019-12-31" } },
      { name: "2000s", value: { start: "2000-01-01", end: "2009-12-31" } },
      { name: "1990s", value: { start: "1990-01-01", end: "1999-12-31" } },
      { name: "1980s", value: { start: "1980-01-01", end: "1989-12-31" } },
      { name: "1970s", value: { start: "1970-01-01", end: "1979-12-31" } },
      { name: "1960s", value: { start: "1960-01-01", end: "1969-12-31" } },
      { name: "Anything", value: { start: "1800-01-01", end: "2100-12-31" } },
    ],
  },
  {
    id: "Languages",
    question: "What languages should the movies be in?",
    options: [
      { name: "English", value: "en" },
      { name: "Spanish", value: "es" },
      { name: "French", value: "fr" },
      { name: "Hindi", value: "hi" },
      { name: "Anything", value: "" },
    ],
  },
  {
    id: "Runtime",
    question: "What runtime do you prefer?",
    options: [
      { name: "Less Than Two Hours", value: 119 },
      { name: "Less Than Three Hours", value: 179 },
      { name: "Anything", value: 500 },
    ],
  },
];

export const regionMap = {
  USA: { code: "US" },
  Canada: { code: "CA" },
  "United Kingdom": { code: "GB" },
  Australia: { code: "AU" },
  Germany: { code: "DE" },
  France: { code: "FR" },
  Italy: { code: "IT" },
  Spain: { code: "ES" },
  Japan: { code: "JP" },
  China: { code: "CN" },
  India: { code: "IN" },
  Pakistan: { code: "PK" },
  Brazil: { code: "BR" },
  Mexico: { code: "MX" },
  "South Korea": { code: "KR" },
  Argentina: { code: "AR" },
  Egypt: { code: "EG" },
  Netherlands: { code: "NL" },
  Sweden: { code: "SE" },
  Norway: { code: "NO" },
  Denmark: { code: "DK" },
  Finland: { code: "FI" },
  Switzerland: { code: "CH" },
  Turkey: { code: "TR" },
  "United Arab Emirates": { code: "AE" },
  "Saudi Arabia": { code: "SA" },
  Indonesia: { code: "ID" },
  Malaysia: { code: "MY" },
  Singapore: { code: "SG" },
  "New Zealand": { code: "NZ" },
};
