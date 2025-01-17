import express from "express"
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express()
const port = 9000
app.use('/', (req, res) => {
    
    res.send({message: 'Hello World'})})
app.listen(9000, () => {
    console.log(`Server is running on port ${port}`)
    })
    app.get('/pumps', async (req, res) => {
        const pumpNames = ['Salarwala', 'Bhalair', 'Chak Jhumra']; // List of pump names to fetch data for
      
        try {
          // Query the database for all pumps with the specified names
          const pumps = await prisma.pump.findMany({
            where: {
              name: {
                in: pumpNames,
              },
            },
          });
      
          if (pumps.length > 0) {
            // Group the pumps by their name
            const groupedPumps = pumpNames.map((name) => {
              const pumpData = pumps.filter((pump) => pump.name === name);
              // Remove fields with null or 0 values from each pump object
              const filteredPumpData = pumpData.map((pump) => {
                return Object.fromEntries(
                  Object.entries(pump).filter(([_, value]) => value !== null && value !== 0)
                );
              });
              return {
                name,
                data: filteredPumpData,
              };
            });
      
            res.status(200).json(groupedPumps); // Send the grouped pump data
          } else {
            res.status(404).json({ message: 'No pump data found' }); // No pumps found
          }
        } catch (error) {
          console.error('Error fetching pump data:', error);
          res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Handle unexpected errors
        }
      });