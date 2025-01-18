
const pump = require('../Models/pumpSchema');


const getpump = async (req, res) => {

    const pumpNames = ['Salarwala', 'Bhalair', 'Chak Jhumra']; // List of pump names to fetch data for

  try {
    // Query the database for all pumps with the specified names
    const pumps = await Pump.find({ name: { $in: pumpNames } });

    if (pumps.length > 0) {
      // Group the pumps by their name
      const groupedPumps = pumpNames.map((name) => {
        const pumpData = pumps.filter((pump) => pump.name === name);
        // Remove fields with null or 0 values from each pump object
        const filteredPumpData = pumpData.map((pump) => {
          return Object.fromEntries(
            Object.entries(pump.toObject()).filter(([_, value]) => value !== null && value !== 0)
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

}


const addpump = async (req, res) => {

    try {
        const pump = new Pump({
          name: req.body.name,
          petrolDate: req.body.petrolDate ? new Date(req.body.petrolDate) : null,
          petrolDelivery: req.body.petrolDelivery || 0,
          petrolSale: req.body.petrolSale || 0,
          dieselDate: req.body.dieselDate ? new Date(req.body.dieselDate) : null,
          dieselDelivery: req.body.dieselDelivery || 0,
          dieselSale: req.body.dieselSale || 0,
          mobileOilDate: req.body.mobileOilDate ? new Date(req.body.mobileOilDate) : null,
          mobileOilDelivery: req.body.mobileOilDelivery || 0,
          mobileOilSale: req.body.mobileOilSale || 0,
        });
    
        const savedPump = await pump.save();
        res.status(201).json(savedPump);
      } catch (error) {
        console.error('Error creating pump:', error);
        res.status(500).json({ error: error.message });
      }
}

const second = (req, res) => {

    res.send({ message: 'Hello from /second route' });
}

module.exports={

    addpump,
    second,
    getpump
    
}