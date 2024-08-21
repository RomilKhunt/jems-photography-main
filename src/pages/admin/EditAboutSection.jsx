import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
} from '@mui/material';

const EditAboutSection = () => {
  const [aboutSection, setAboutSection] = useState({
    aboutPosterImg: null,
    description: [''], // Array to store multiple paragraphs
  });

  const handleInputChange = (field, value) => {
    setAboutSection({ ...aboutSection, [field]: value });
  };

  const handlePosterChange = (event) => {
    setAboutSection({ ...aboutSection, aboutPosterImg: event.target.files[0] });
  };

  const handleAddParagraph = () => {
    setAboutSection({
      ...aboutSection,
      description: [...aboutSection.description, ''],
    });
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescription = [...aboutSection.description];
    updatedDescription[index] = value;
    setAboutSection({ ...aboutSection, description: updatedDescription });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(aboutSection);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Edit About Section
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <label htmlFor="aboutPosterInput">Select About Poster Image</label>
              <input
                type="file"
                accept="image/*"
                id="aboutPosterInput"
                onChange={handlePosterChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={aboutSection.description[0]}
                onChange={(e) => handleDescriptionChange(0, e.target.value)}
              />
            </Grid>
            {aboutSection.description.slice(1).map((paragraph, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  label={`Paragraph ${index + 1}`}
                  fullWidth
                  multiline
                  rows={4}
                  value={paragraph}
                  onChange={(e) => handleDescriptionChange(index + 1, e.target.value)}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={handleAddParagraph}>
                Add New Paragraph
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditAboutSection;
