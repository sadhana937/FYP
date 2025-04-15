import React, { useEffect, useState } from 'react';
import IPDetailsModal from './IPDetailsModal'; // assuming both files are in the same folder
import { IP } from '../types/IP';

interface Props {
  id: number;
  onClose: () => void;
}

const IPDetailsModalContainer: React.FC<Props> = ({ id, onClose }) => {

  const [ip, setIp] = useState<IP | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await fetch(`http://localhost:3000/search-ip/${id}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch IP details');
        }

        setIp(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIP();
  }, [id]);

  if (loading) return null; // Or a spinner/loading indicator
  if (error) return null; // Or display error message if you want

  return ip ? <IPDetailsModal ip={ip} onClose={onClose} /> : null;
};

export default IPDetailsModalContainer;
