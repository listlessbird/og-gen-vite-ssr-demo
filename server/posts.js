const posts = [
  {
    id: "1",
    title: "The Rise of Artificial Intelligence",
    title: "Listless",
    description: "Exploring the advancements and future potential of AI.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Artificial Intelligence (AI) is rapidly evolving, influencing various sectors including healthcare, finance, and transportation. AI technologies like machine learning, natural language processing, and robotics are transforming industries and creating new opportunities.",
  },
  {
    id: "2",
    title: "Quantum Computing: A New Era",
    title: "Listless",
    description: "Understanding the basics and potential of quantum computing.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Quantum computing represents a significant leap forward from classical computing. By leveraging quantum bits or qubits, quantum computers can solve complex problems at unprecedented speeds, potentially revolutionizing fields such as cryptography and drug discovery.",
  },
  {
    id: "3",
    title: "Blockchain Technology Explained",
    title: "Listless",
    description: "A comprehensive guide to how blockchain technology works.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Blockchain technology underpins cryptocurrencies like Bitcoin and Ethereum. It offers a decentralized, secure way of recording transactions using a distributed ledger. This technology has applications beyond finance, including supply chain management and digital identity verification.",
  },
  {
    id: "4",
    title: "The Internet of Things (IoT) Revolution",
    title: "Listless",
    description: "How IoT is changing the way we interact with the world.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "The Internet of Things (IoT) connects everyday devices to the internet, allowing them to collect and share data. This technology enhances efficiency and convenience in various domains, from smart homes to industrial automation and healthcare monitoring.",
  },
  {
    id: "5",
    title: "5G Technology: What You Need to Know",
    title: "Listless",
    description: "Exploring the features and benefits of 5G technology.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "5G technology promises faster speeds, lower latency, and improved connectivity compared to previous generations. It supports innovations such as autonomous vehicles, enhanced mobile broadband, and smart cities by providing a robust and reliable network infrastructure.",
  },
  {
    id: "6",
    title: "Cybersecurity in the Modern World",
    title: "Listless",
    description: "Strategies and tools for protecting your digital assets.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Cybersecurity is crucial in an increasingly digital world. It involves protecting networks, systems, and data from cyber attacks. Effective strategies include using strong passwords, implementing multi-factor authentication, and keeping software updated to defend against vulnerabilities.",
  },
  {
    id: "7",
    title: "Augmented Reality vs. Virtual Reality",
    title: "Listless",
    description: "Comparing AR and VR technologies and their applications.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Augmented Reality (AR) overlays digital information on the real world, while Virtual Reality (VR) creates a completely immersive digital environment. Both technologies have diverse applications, from gaming and entertainment to education and training.",
  },
  {
    id: "8",
    title: "The Future of Cloud Computing",
    title: "Listless",
    description: "How cloud computing is evolving and its future implications.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Cloud computing allows for scalable and on-demand access to computing resources over the internet. Future trends include increased adoption of hybrid and multi-cloud strategies, advancements in edge computing, and greater emphasis on data privacy and security.",
  },
  {
    id: "9",
    title: "The Impact of 3D Printing",
    title: "Listless",
    description: "Examining how 3D printing is revolutionizing manufacturing.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "3D printing technology enables the creation of three-dimensional objects from digital models. It has the potential to transform manufacturing by allowing rapid prototyping, custom manufacturing, and reducing waste, impacting industries from healthcare to automotive.",
  },
  {
    id: "10",
    title: "Advancements in Robotics",
    title: "Listless",
    description: "Current trends and future developments in robotics.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Robotics is advancing with improvements in artificial intelligence, machine learning, and automation. Modern robots are increasingly capable of performing complex tasks in fields such as manufacturing, healthcare, and exploration, leading to greater efficiency and innovation.",
  },
  {
    id: "11",
    title: "The Role of Big Data in Business",
    title: "Listless",
    description: "How businesses leverage big data for strategic decisions.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Big Data refers to large and complex data sets that require advanced tools and techniques to analyze. Businesses use big data to gain insights into customer behavior, improve operational efficiency, and drive strategic decision-making.",
  },
  {
    id: "12",
    title: "Edge Computing Explained",
    title: "Listless",
    description: "Understanding the concept and benefits of edge computing.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Edge computing involves processing data closer to the source rather than relying on centralized data centers. This approach reduces latency, enhances speed, and improves reliability, which is crucial for real-time applications such as autonomous vehicles and IoT devices.",
  },
  {
    id: "13",
    title: "The Evolution of User Interface Design",
    title: "Listless",
    description: "Trends and innovations in UI design over the years.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "User Interface (UI) design has evolved from simple text-based interfaces to sophisticated, interactive designs. Modern UI design focuses on user experience, incorporating elements like responsive design, voice interfaces, and gesture-based controls to enhance usability.",
  },
  {
    id: "14",
    title: "Tech Innovations in Healthcare",
    title: "Listless",
    description: "How technology is transforming the healthcare industry.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Technology is revolutionizing healthcare with innovations such as telemedicine, wearable health devices, and electronic health records. These advancements improve patient care, streamline medical workflows, and enable better health monitoring and diagnostics.",
  },
  {
    id: "15",
    title: "The Significance of Digital Transformation",
    title: "Listless",
    description:
      "Why digital transformation is critical for modern businesses.",
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Digital transformation involves integrating digital technology into all areas of a business, fundamentally changing how it operates and delivers value. It enhances efficiency, improves customer experience, and enables businesses to adapt to evolving market demands.",
  },
  {
    id: "16",
    title: "Smart Cities: The Future of Urban Living",
    title: "Listless",
    description: "Exploring the concept and benefits of smart cities.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Smart cities use technology to enhance the quality of life for residents through improved infrastructure, efficient resource management, and advanced services. Features include smart transportation systems, energy-efficient buildings, and enhanced public safety.",
  },
  {
    id: "17",
    title: "The Rise of Remote Work Technology",
    title: "Listless",
    description: "How technology supports remote work and collaboration.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Remote work technology includes tools for video conferencing, project management, and team collaboration. These technologies facilitate flexible work arrangements, improve productivity, and help maintain communication and engagement among distributed teams.",
  },
  {
    id: "18",
    title: "Understanding DevOps Practices",
    title: "Listless",
    description:
      "An overview of DevOps and its benefits for software development.",
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to improve collaboration and productivity. It emphasizes automation, continuous integration, and continuous delivery to accelerate development cycles and enhance software quality.",
  },
  {
    id: "19",
    title: "The Role of Artificial Neural Networks",
    title: "Listless",
    description: "How artificial neural networks mimic the human brain.",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "Artificial neural networks are computational models inspired by the human brain. They are used in machine learning to recognize patterns, make predictions, and solve complex problems. Their applications include image and speech recognition, and natural language processing.",
  },
  {
    id: "20",
    title: "Ethical Considerations in Technology",
    title: "Listless",
    description:
      "Examining the ethical implications of technological advancements.",
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    content:
      "As technology advances, ethical considerations become increasingly important. Issues such as privacy, data security, and the impact of automation on jobs need to be addressed. Ensuring that technology is used responsibly and ethically is crucial for its positive impact on society.",
  },
];

export function getPostById(id) {
  return posts.find((post) => post.id === id);
}

export function getAllPosts() {
    return posts;
}