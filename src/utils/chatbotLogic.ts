export const KNOWLEDGE_BASE = {
  greetings: [
    "hi", "hello", "hey", "howdy", "sup", "greetings"
  ],
  about: [
    "who are you", "what are you", "about", "yourself", "marlon", "author"
  ],
  skills: [
    "skills", "stack", "technologies", "tech", "react", "node", "python", "javascript", "program", "code"
  ],
  projects: [
    "projects", "work", "portfolio", "built", "create", "app"
  ],
  contact: [
    "contact", "email", "phone", "reach", "hire", "message"
  ],
  experience: [
    "experience", "resume", "history", "job", "work history"
  ]
};

export const RESPONSES = {
  default: [
    "I'm not sure I understand. Try asking about my skills, projects, or how to contact Marlon.",
    "I'm still learning! Ask me about Marlon's work, stack, or experience.",
    "Could you rephrase that? I can tell you about Marlon's skills, projects, and more."
  ],
  greetings: [
    "Hello! I'm Marlon's virtual assistant. How can I help you today?",
    "Hi there! Ask me anything about Marlon's portfolio.",
    "Greetings! I'm here to answer your questions about Marlon."
  ],
  about: [
    "I am a virtual assistant representing Marlon Isaguirre Jr., a BSIT student and Web Developer. He builds high-performance, accessible web apps.",
    "Marlon is a 3rd-year BSIT student at Cavite State University specializing in the MERN stack and Python."
  ],
  skills: [
    "Marlon specializes in the MERN Stack (MongoDB, Express, React, Node.js), Python, and modern web standards. He's also proficient in PHP, MySQL, and Git.",
    "His technical toolkit includes React.js, Node.js, Python, TypeScript, and responsive design with CSS/HTML5."
  ],
  projects: [
    "Marlon has built various web applications focusing on performance and user experience. You can see the full list in the 'Projects' section of this page!",
    "He works on full-stack applications. Check out the Projects section to see his latest work with React and Node.js."
  ],
  contact: [
    "You can reach Marlon at marloncopilot@gmail.com or call +63 994 818 0273.",
    "Feel free to send a message using the Contact form below, or email him directly at marloncopilot@gmail.com."
  ],
  experience: [
    "Marlon is a 3rd-year student with practical experience in freelance web development and academic projects, focusing on backend logic and frontend optimization."
  ]
};

export function getBotResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  // Simple keyword matching
  if (KNOWLEDGE_BASE.greetings.some(word => lowerInput.includes(word))) {
    return getRandom(RESPONSES.greetings);
  }
  if (KNOWLEDGE_BASE.about.some(word => lowerInput.includes(word))) {
    return getRandom(RESPONSES.about);
  }
  if (KNOWLEDGE_BASE.skills.some(word => lowerInput.includes(word))) {
    return getRandom(RESPONSES.skills);
  }
  if (KNOWLEDGE_BASE.projects.some(word => lowerInput.includes(word))) {
    return getRandom(RESPONSES.projects);
  }
  if (KNOWLEDGE_BASE.contact.some(word => lowerInput.includes(word))) {
    return getRandom(RESPONSES.contact);
  }
  if (KNOWLEDGE_BASE.experience.some(word => lowerInput.includes(word))) {
    return getRandom(RESPONSES.experience);
  }

  return getRandom(RESPONSES.default);
}

function getRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
