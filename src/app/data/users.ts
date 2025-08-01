

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; 
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', 
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2023-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123', 
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=5',
    createdAt: '2023-02-20T14:15:00Z'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'password123', 
    role: 'user',
    createdAt: '2023-03-10T09:45:00Z'
  }
];


export const authenticateUser = (email: string, password: string): User | null => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
  
  return null;
};

export const registerUser = (userData: Omit<User, 'id' | 'createdAt' | 'role'>): User | null => {
  const existingUser = mockUsers.find(u => u.email === userData.email);
  if (existingUser) {
    return null;
  }
  
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: 'user',
    avatar: userData.avatar,
    createdAt: new Date().toISOString()
  };
  
  mockUsers.push(newUser);
  
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword as User;
};
