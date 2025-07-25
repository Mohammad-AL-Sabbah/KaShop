import { Navigate } from 'react-router-dom';
function ProtectedRouter({ children }) {
  const token = localStorage.getItem('Usertoken');

  if(!token){
  return (
    <Navigate to="/login" />
  )
  }
    return children;
}
export default ProtectedRouter