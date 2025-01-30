import './styles/globals.css';  // İki üst dizine çıkılarak styles dizinine ulaşılır



export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
 
          {children}
     
      </body>
    </html>
  );
}





