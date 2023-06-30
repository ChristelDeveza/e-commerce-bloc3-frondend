/* eslint-disable react/prop-types */
import axios from 'axios';

function ExportPdfButton() {
  const handleExportPDF = () => {
    // Requête au backend
    axios
      .get('http://localhost:8080/products/generate-pdf', {
        responseType: 'blob',
      })
      .then((response) => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);

        // Permet de créer un lien temporaire pour télécharger le fichier PDF
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', 'produits_promo.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Erreur lors de la génération du PDF:', error);
      });
  };

  const buttonStyle = {
    backgroundColor: ' #34add9',
    borderRadius: '10px',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '2rem',
    border: '1px solid black',
  };

  return (
    <div>
      {' '}
      <button style={buttonStyle} onClick={handleExportPDF}>
        Promo Export PDF
      </button>
    </div>
  );
}

export default ExportPdfButton;
