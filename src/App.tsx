import { BrowserRouter } from 'react-router-dom';
import Storefront from './storefront/Storefront';

export function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Storefront />
    </BrowserRouter>
  );
}
