import { useState } from 'react';
import axios from 'axios';

interface UserInput {
  email: string;
  password: string;
}

const SignupPage = () => {
  const [formData, setFormData] = useState<UserInput>({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signup', formData);
      console.log('Signup success:', res.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupPage;
