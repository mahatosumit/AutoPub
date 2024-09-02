document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const processFileButton = document.getElementById('processFile');
    const publicationSummary = document.getElementById('publication-summary');
    const facultyProfile = document.getElementById('faculty-profile');
  
    processFileButton.addEventListener('click', function () {
      const file = fileInput.files[0];
      if (file) {
        readExcelFile(file);
      } else {
        alert('Please upload a file.');
      }
    });
  
    function readExcelFile(file) {
      const reader = new FileReader();
      
      reader.onload = function (event) {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        
        generatePublicationSummary(json);
      };
  
      reader.readAsBinaryString(file);
    }
  
    function generatePublicationSummary(publications) {
      publicationSummary.innerHTML = '';
  
      publications.forEach(pub => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        const card = document.createElement('div');
        card.className = 'card p-3';
        
        card.innerHTML = `
          <h5>${pub.Title || 'No Title'}</h5>
          <p><strong>Authors:</strong> ${pub.Authors || 'Unknown'}</p>
          <p><strong>Year:</strong> ${pub.Year || 'Unknown'}</p>
          <p>${pub.Summary || 'No Summary'}</p>
        `;
        
        col.appendChild(card);
        publicationSummary.appendChild(col);
      });
    }
  
    function generateFacultyProfile() {
      facultyProfile.innerHTML = `
        <h3>Dr. Jane Doe</h3>
        <p><strong>Department:</strong> Computer Science</p>
        <p><strong>Email:</strong> jane.doe@example.com</p>
        <p><strong>Research Interests:</strong> Machine Learning, Artificial Intelligence</p>
      `;
    }
  
    // Initialize faculty profile
    generateFacultyProfile();
  });
  