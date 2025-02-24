import React, { useState } from 'react';
import { shoes } from './shoes';
import './App.css';

export default function App() {
  const [shoeList, setShoeList] = useState(shoes);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedSize, setEditedSize] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedType, setEditedType] = useState('');
  const [editedColor, setEditedColor] = useState('');
  const [editedStock, setEditedStock] = useState('');
  const [editedImage, setEditedImage] = useState('');

  const handleEditClick = (shoe) => {
    setEditingId(shoe.id);
    setEditedName(shoe.name);
    setEditedPrice(shoe.price);
    setEditedSize(shoe.sizes.join(', ')); 
    setEditedType(shoe.type);
    setEditedColor(shoe.color);
    setEditedStock(shoe.stock);
    setEditedImage(shoe.image);
  };

  const handleSaveClick = (id) => {
    const updatedShoes = shoeList.map(shoe => {
      if (shoe.id === id) {
        return { 
          ...shoe, 
          name: editedName, 
          price: editedPrice, 
          sizes: editedSize.split(',').map(size => size.trim()), 
          type: editedType, 
          color: editedColor, 
          stock: editedStock,
          image: editedImage
        };
      }
      return shoe;
    });
    setShoeList(updatedShoes);
    setEditingId(null);
    setEditedName('');
    setEditedPrice('');
    setEditedSize('');
    setEditedType('');
    setEditedColor('');
    setEditedStock('');
    setEditedImage('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedImage(imageUrl);
    }
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ color: '#333' }}>Shoe Store</h1>
      <ul className="shoe-list">
        {shoeList.map(shoe => {
          if (editingId === shoe.id) {
            return (
              <li key={shoe.id} className="shoe-item" style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
                <img src={editedImage} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
                <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
                <input type="text" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
                <input type="text" value={editedColor} onChange={(e) => setEditedColor(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
                <input type="text" value={editedSize} onChange={(e) => setEditedSize(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
                <input type="text" value={editedStock} onChange={(e) => setEditedStock(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
                <input type="text" value={editedType} onChange={(e) => setEditedType(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
                <input type="file" onChange={handleImageChange} style={{ margin: '5px', padding: '5px', width: '100%' }} />
                <button onClick={() => handleSaveClick(shoe.id)} style={{ backgroundColor: '#28a745', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '3px', marginTop: '10px' }}>Save</button>
              </li>
            );
          } else {
            return (
              <li key={shoe.id} className="shoe-item" style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
                <img src={shoe.image} alt={shoe.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
                <p className="price">Price: {shoe.price}</p>
                <h2 style={{ color: '#007bff', fontSize: '18px' }}>{shoe.name}</h2>
                <p>Type: {shoe.type}</p>
                <p>Sizes: {shoe.sizes.join(', ')}</p>
                <p>Color: {shoe.color}</p>
                <p>Stock: {shoe.stock}</p>
                <button onClick={() => handleEditClick(shoe)} style={{ backgroundColor: '#ffc107', color: 'black', padding: '5px 10px', border: 'none', borderRadius: '3px' }}>Edit</button>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}