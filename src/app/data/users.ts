// Mock user data for authentication simulation

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // In a real app, this would be hashed
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2023-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123', // In a real app, this would be hashed
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=5',
    createdAt: '2023-02-20T14:15:00Z'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'password123', // In a real app, this would be hashed
    role: 'user',
    createdAt: '2023-03-10T09:45:00Z'
  }
];

// Function to authenticate a user
export const authenticateUser = (email: string, password: string): User | null => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Don't return the password in the response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
  
  return null;
};

// Function to register a new user
export const registerUser = (userData: Omit<User, 'id' | 'createdAt' | 'role'>): User | null => {
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === userData.email);
  if (existingUser) {
    return null;
  }
  
  // Create new user
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    name: userData.name,
    email: userData.email,
    password: userData.password, // In a real app, this would be hashed
    role: 'user',
    avatar: userData.avatar,
    createdAt: new Date().toISOString()
  };
  
  // Add to mock database
  mockUsers.push(newUser);
  
  // Don't return the password in the response
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword as User;
};
