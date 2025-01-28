
const Pump = require('../Models/pumpSchema');
const Amount = require('../Models/amountSchmea');
const Credit = require('../Models/creditSchmea');
const Debit = require('../Models/debitSchema');
const Udhar = require('../Models/udharSchema');

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


// const addpump = async (req, res) => {

//     try {
//         const pump = new Pump({
//           name: req.body.name,
//           petrolDate: req.body.petrolDate ? new Date(req.body.petrolDate) : null,
//           petrolDelivery: req.body.petrolDelivery || 0,
//           petrolSale: req.body.petrolSale || 0,
//           dieselDate: req.body.dieselDate ? new Date(req.body.dieselDate) : null,
//           dieselDelivery: req.body.dieselDelivery || 0,
//           dieselSale: req.body.dieselSale || 0,
//           mobileOilDate: req.body.mobileOilDate ? new Date(req.body.mobileOilDate) : null,
//           mobileOilDelivery: req.body.mobileOilDelivery || 0,
//           mobileOilSale: req.body.mobileOilSale || 0,
//         });
    
//         const savedPump = await pump.save();
//         res.status(201).json(savedPump);
//       } catch (error) {
//         console.error('Error creating pump:', error);
//         res.status(500).json({ error: error.message });
//       }
// }


const addpump = async (req, res) => {
  try {
    const { 
      name, 
      petrolDate, petrolDelivery, petrolSale, 
      dieselDate, dieselDelivery, dieselSale, 
      mobileOilDate, mobileOilDelivery, mobileOilSale 
    } = req.body;
  
    // Fetch the last entry of the pump to get the previous stock values
    const lastPump = await Pump.findOne({ name }).sort({ createdAt: -1 });
  
    // Calculate the initial balances
    let petrolBalance = (petrolDelivery - petrolSale) || 0;
    let dieselBalance = (dieselDelivery - dieselSale) || 0;
    let mobileOilBalance = (mobileOilDelivery - mobileOilSale) || 0;
  
    // If this is not the first entry, add the previous stock value to the balance
    if (lastPump) {
      petrolBalance += lastPump.petrolStockOriginal || 0;
      dieselBalance += lastPump.dieselStockOriginal || 0;
      mobileOilBalance += lastPump.mobileOilStockOriginal || 0;
    }
  
    // Ensure the balances are numbers and not NaN
    petrolBalance = isNaN(petrolBalance) ? 0 : petrolBalance;
    dieselBalance = isNaN(dieselBalance) ? 0 : dieselBalance;
    mobileOilBalance = isNaN(mobileOilBalance) ? 0 : mobileOilBalance;
  
    // Create new pump instance
    const pump = new Pump({
      name,
      petrolDate: petrolDate ? new Date(petrolDate) : null,
      petrolDelivery: petrolDelivery || 0,
      petrolSale: petrolSale || 0,
       // Set initial stock original for petrol
  
      dieselDate: dieselDate ? new Date(dieselDate) : null,
      dieselDelivery: dieselDelivery || 0,
      dieselSale: dieselSale || 0,
     // Set initial stock original for diesel
  
      mobileOilDate: mobileOilDate ? new Date(mobileOilDate) : null,
      mobileOilDelivery: mobileOilDelivery || 0,
      mobileOilSale: mobileOilSale || 0,
      // Set initial stock original for mobile oil
    });
  
    // Save the pump data
    const savedPump = await pump.save();
   
    // Add balance to stockOriginal after 1 minute
    setTimeout(async () => {
      const updatedPump = await Pump.findById(savedPump._id);

      if (updatedPump) {
        // Update stockOriginal for each type of fuel
        updatedPump.petrolStockOriginal += petrolBalance;
        updatedPump.dieselStockOriginal += dieselBalance;
        updatedPump.mobileOilStockOriginal += mobileOilBalance;

        await updatedPump.save(); // Save the updated pump

       
      }
    }, 86400000); // 1 minute in milliseconds

    res.status(201).json(savedPump);
  } catch (error) {
    console.error('Error creating pump:', error);
    res.status(500).json({ error: error.message });
  }
};


const second = (req, res) => {

    res.send({ message: 'Hello from /second route' });
}



const amount = async (req, res) => {
    try {
      const amount = new Amount({
        name: req.body.name,
        Date: req.body.date,
        totalsale: req.body.totalsale,
        expenditure: req.body.expenditure,
      });
  
      const savedAmount = await amount.save();
      res.status(201).json(savedAmount);
    } catch (error) {
      console.error('Error creating amount:', error);
      handleError(res, error);
    }
  }

  
 const getamount= async (req, res) => {
    try {
      const amounts = await Amount.find();
      res.json(amounts);
    } catch (error) {
      console.error('Error fetching amounts:', error);
      handleError(res, error);
    }
  }

  

  const udhar =  async (req, res) => {
    try {
      const udhar = new Udhar(req.body);
      const savedUdhar = await udhar.save();
      res.status(201).json(savedUdhar);
    } catch (error) {
      console.error('Error creating udhar:', error);
      handleError(res, error);
    }
  }

  
  const getudhar = async (req, res) => {
    try {
      // Fetch all records from the 'udhars' collection
      const udhars = await Udhar.find();
      
      // Log the fetched data for debugging
    //   console.log('Fetched udhars:', udhars);
  
      // Send all data as the response
      res.status(200).json(udhars);
    } catch (error) {
      console.error('Error fetching udhars:', error);
  
      // Send error response
      res.status(500).json({
        message: 'Failed to fetch udhars',
        error: error.message,
      });
    }
  };
  

  

 const credit = async (req, res) => {
    try {
      const credit = new Credit(req.body);
      const savedCredit = await credit.save();
      res.status(201).json(savedCredit);
    } catch (error) {
      console.error('Error creating credit:', error);
      handleError(res, error);
    }
  }

  
  const getcredit =  async (req, res) => {
    try {
      const credits = await Credit.find();
      res.json(credits);
    } catch (error) {
      console.error('Error fetching credits:', error);
      handleError(res, error);
    }
  }

  
  const debit =  async (req, res) => {
    try {
      const debit = new Debit(req.body);
      const savedDebit = await debit.save();
      res.status(201).json(savedDebit);
    } catch (error) {
      console.error('Error creating debit:', error);
      handleError(res, error);
    }
  }

  
  const getdebit =  async (req, res) => {
    try {
      const debits = await Debit.find();
      res.json(debits);
    } catch (error) {
      console.error('Error fetching debits:', error);
      handleError(res, error);
    }
  }
  
module.exports={

    addpump,
    getpump,
    second,
    amount,
    getamount,
    udhar,
    getudhar,
    credit,
    getcredit,
    debit,
    getdebit

    
}