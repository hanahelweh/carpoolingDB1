const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer');
const storage = multer.diskStorage({ destination: "/", filename: (req, file, cb) => { cb(null, file.originalname); }, });
const upload = multer({ storage });
const User = require("../model/user");
const Car = require("../model/car");
const CarHasDriver = require("../model/carHasDriver");
const Driver = require("../model/driver");
const LocationRide = require("../model/locationRide");
const Locations = require("../model/locations");
const PassengerRide = require("../model/passengerRide");
const Passenger = require("../model/passenger");
const Ride = require("../model/ride");
const RideRequest = require("../model/rideRequest");
const express = require("express");
const passengerRide = require("../model/passengerRide");
const router = express.Router();
module.exports = router;

const app = express();
app.use(bodyParser.json());
app.use(cors());

//add a User
router.post("/addUser", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const data = new User({
      fullName: req.body.fullName,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      smoking: req.body.smoking,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      location: req.body.location,
      image: file.path,
    });

    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Get all users
router.get("/getUsers", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get a user
router.get("/getUser/:id", async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Update a user
router.patch("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await User.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//add location
router.post("/addLocation", async (req, res) => {
  try {
    const data = new Locations({
      cities: req.body.cities,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    });

    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//add driver
router.post(
  "/addDriver",
  upload.single("driverLicenseImage"),
  async (req, res) => {
    try {
      const user = await User.findById(req.body.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const file = req.file;
      const data = new Driver({
        driverLicenseImage: file.path,
        driverLicenseType: req.body.driverLicenseType,
        driverRate: req.body.driverRate,
        user: user._id,
      });

      const savedData = await data.save();

      res.status(200).json(savedData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

//Update a driver to be edited
router.patch("/updateDriver/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await driver.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//add a car
router.post("/addCar", upload.single("carInsuranceImage"), async (req, res) => {
  try {
    const file = req.file;
    const data = new Car({
      carType: req.body.carType,
      carModel: req.body.carModel,
      carCondition: req.body.carCondition,
      seatsAvailable: req.body.seatsAvailable,
      luggageAvailable: req.body.luggageAvailable,
      carInsuranceImage: file.path,
    });

    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Get a car
router.get("/getCar/:id", async (req, res) => {
  try {
    const data = await Car.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Update a car to be edited
router.patch("/updateCar/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Car.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Delete a car to be edited
router.delete("/deleteCar/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Car.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a ride
router.post("/addRide", async (req, res) => {
  try {
    const userId = req.body.driverId;
    const FromLocation = await Locations.findOne({
      cities: req.body.FromLocation,
    });
    if (!FromLocation) {
      return res.status(404).json({ message: "From location not found" });
    }

    const ToLocation = await Locations.findOne({ cities: req.body.ToLocation });
    if (!ToLocation) {
      return res.status(404).json({ message: "To location not found" });
    }

    const data = new Ride({
      user: userId,
      rideDate: req.body.rideDate,
      rideTime: req.body.rideTime,
      FromLocation: FromLocation._id,
      ToLocation: ToLocation._id,
      estimatedDuration: req.body.estimatedDuration,
    });

    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update a ride
router.patch("/updateRide/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Ride.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Get a ride
router.get("/getRide/:id", async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate("user"); //to be edited
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all rides
router.get("/getRides", async (req, res) => {
  try {
    const data = await Ride.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete a ride
router.delete("/deleteRide/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Ride.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted...`)
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
});

// add a passenger
router.post("/addPassenger", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = new Passenger({
      passengerRate: req.body.passengerRate,
      user: user._id,
    });
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get a passenger with user information to be edited
router.get("/getPassenger/:id", async (req, res) => {
  try {
    const data = await Passenger.findById(req.params.id).populate("user");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all passengers to be edited
router.get("/getPassengers", async (req, res) => {
  try {
    const data = await Passenger.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update a Passenger to be edited
router.patch("/updatePassenger/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Passenger.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get all rides for a specific driver to be edited
// GET /rides/user/:userId
router.get("/ridesuser/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const rides = await Ride.find({ user: userId }).populate(
      "FromLocation ToLocation"
    );
    res.json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a driver with associated user information to be edited
router.get("/getDriver/:id", async (req, res) => {
  try {
    const driver = await Driver.findOne({ userId: User });

    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//ADD passenger to a ride
router.post("/addPassengerRide", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const ride = await Ride.findById(req.body.rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    const data = new PassengerRide({
      user: user._id,
      ride: ride._id,
    });
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all users requested for a ride
router.get("/ridePassenger/:rideId", async (req, res) => {
  try {
    const { rideId } = req.params;
    const ride = await Ride.findById(rideId);
    // Find all passengerRide records for the given rideId
    const passengerRides = await PassengerRide.find({ ride: rideId });

    // Extract the user IDs from passengerRides
    const userIds = passengerRides.map((passengerRide) => passengerRide.user);

    // Query the "user" model with the extracted user IDs
    const users = await User.find({ _id: { $in: userIds } });

    // Query the "passenger" model with the extracted user IDs
    const passengers = await Passenger.find({ user: { $in: userIds } });

    // Combine user and passenger information
    const passengerData = users.map((user) => {
      const passenger = passengers.find(
        (p) => p.user.toString() === user._id.toString()
      );
      const passengerRide = passengerRides.find(
        (pr) => pr.user.toString() === user._id.toString()
      );
      return {
        user: {
          _id: user._id,
          fullName: user.fullName,
          userName: user.userName,
          smoking: user.smoking,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          location: user.location,
          image: user.image,
        },
        passengerRate: passenger ? passenger.passengerRate : null,
        status: passengerRide ? passengerRide.status : "Pending",
        ride: {
          _id: ride._id,
        },
      };
    });

    res.json(passengerData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE passenger from a ride
router.delete("/deletePassengerRide/:userId/:rideId", async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId.createFromHexString(req.params.userId);
    const rideId = mongoose.Types.ObjectId.createFromHexString(req.params.rideId);
    const passengerRide = await PassengerRide.findOneAndDelete({
      user: userId,
      ride: rideId,
    });
    if (!passengerRide) {
      return res.status(404).json({ message: "Passenger ride not found" });
    }
    res.status(200).json({ message: "Passenger ride deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// add stops
router.post("/addLocationRide", async (req, res) => {
  try {
    const location = await Locations.findById(req.body.locationId);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    const ride = await Ride.findById(req.body.rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    const lastPosition = await LocationRide.findOne(
      { ride: ride._id },
      {},
      { sort: { position: -1 }, limit: 1 }
    );
    const newPosition = lastPosition ? lastPosition.position + 1 : 1;

    const data = new LocationRide({
      location: location._id,
      ride: ride._id,
      position: newPosition,
    });
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//add request for a ride
router.post("/addRequest", async (req, res) => {
  try {
    const { FromLocation, ToLocation, passenger } = req.body;

    // Check if the passenger exists as a user
    const user = await User.findById(passenger);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const rideRequest = new RideRequest({
      FromLocation,
      ToLocation,
      passenger,
    });

    const savedRideRequest = await rideRequest.save();
    res.status(201).json(savedRideRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//update a request
router.patch("/updatetRequest/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await RideRequest.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// get all requests
router.get("/getRequests", async (req, res) => {
  try {
    const rideRequests = await RideRequest.find();
    res.json(rideRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// delete a request
router.delete("/deleteRequest/:id", async (req, res) => {
  try {
    const rideRequest = await RideRequest.findByIdAndDelete(req.params.id);
    if (!rideRequest) {
      return res.status(404).json({ message: "Ride request not found" });
    }
    res.json({ message: "Ride request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//search a ride
router.get("/searchRide/:from/:to", async (req, res) => {
  const { from, to } = req.params;
  const { date } = req.query;

  if (!from || !to || !date) {
    return res
      .status(400)
      .json({ message: "Please provide 'from', 'to', and 'date' parameters" });
  }

  try {
    const rides = await Ride.find({
      $and: [
        {
          $or: [
            { FromLocation: from },
            {
              _id: {
                $in: await LocationRide.find({ location: from }).distinct(
                  "ride"
                ),
              },
            },
          ],
        },
        {
          $or: [
            { ToLocation: to },
            {
              _id: {
                $in: await LocationRide.find({ location: to }).distinct("ride"),
              },
            },
          ],
        },
        { rideDate: date },
      ],
    })
      .populate({
        path: "FromLocation",
        select: "cities",
      })
      .populate({
        path: "ToLocation",
        select: "cities",
      })
      .populate({
        path: "user",
      });

    // Get locationRide records for the rides
    const rideIds = rides.map((ride) => ride._id);
    const locationRides = await LocationRide.find({
      ride: { $in: rideIds },
    }).populate("location");

    // Map locationRide records to their respective rides
    const rideLocations = locationRides.reduce((acc, locationRide) => {
      const { ride, location } = locationRide;
      if (!acc[ride]) {
        acc[ride] = [];
      }
      acc[ride].push(location);
      return acc;
    }, {});

    // Get the driver information based on the user ID within the ride
    const ridesWithDriverInfo = await Promise.all(
      rides.map(async (ride) => {
        const driver = await Driver.findOne({ user: ride.user._id });
        return {
          ...ride.toObject(),
          user: {
            ...ride.user.toObject(),
            driver: driver.toObject(),
          },
          locations: rideLocations[ride._id] || [],
        };
      })
    );

    res.json({ rides: ridesWithDriverInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all locations
router.get("/getLocations", async (req, res) => {
  try {
    const data = await Locations.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//get passengerRide with passenger information
router.get("/getPassengerRide/:id", async (req, res) => {
  try {
    const data = await passengerRide
      .findById(req.params.id)
      .populate("passenger");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//update passengerRide by userId
router.patch("/passengerRides/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Extract the user ID from the request parameters
    const { status } = req.body; // Assuming the updated status is sent in the request body

    // Update the passengerRide document by user ID
    const updatedPassengerRide = await PassengerRide.findOneAndUpdate(
      { user: userId },
      { status },
      { new: true }
    );

    if (!updatedPassengerRide) {
      return res.status(404).json({ error: "Passenger ride not found" });
    }

    res.json(updatedPassengerRide);
  } catch (error) {
    res.status(500).json({ error: "Failed to update passenger ride status" });
  }
});
// Get all passengerRide for a specific user with populated user, ride, and FromLocation information
router.get("/passengerRides/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const passengerRides = await PassengerRide.find({ user: userId })
      .populate({
        path: "user",
        model: "user",
      })
      .populate({
        path: "ride",
        populate: [
          {
            path: "FromLocation",
            model: "locations",
          },
          {
            path: "ToLocation",
            model: "locations",
          },
        ],
      });

    if (!passengerRides || passengerRides.length === 0) {
      return res
        .status(404)
        .json({ message: "No passengerRides found for the specified user" });
    }
    res.status(200).json(passengerRides);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// POST /carhasdrivers - Create a new carHasDriver
router.post("/carhasdrivers", async (req, res) => {
  const userId = req.body.driverId;
  const carId = req.body.carId;
  const carHasDriver = new CarHasDriver({
    car: carId,
    user: userId,
  });

  try {
    const newCarHasDriver = await carHasDriver.save();
    res.status(201).json(newCarHasDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/carHasDriver/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const carHasDriver = await CarHasDriver.findOne({ user: userId }).populate(
      "car"
    );

    if (!carHasDriver) {
      return res
        .status(404)
        .json({ error: "User not found or no car associated" });
    }

    const car = carHasDriver.car;
    res.json({ car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update status inside passengerRide by rideId
router.patch("/updatePassengerRides/:rideId/:userId", async (req, res) => {
  try {
    const { rideId, userId } = req.params;
    const { status } = req.body;

    // Validate status value
    const validStatusValues = ["Pending", "Approved", "Rejected"];
    if (!validStatusValues.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Add authentication and authorization checks here if required

    // Update the passengerRide document by ride ID
    const updatedPassengerRide = await PassengerRide.findOneAndUpdate(
      { ride: rideId, user: userId  },
      { status },
      { new: true }
    );

    if (!updatedPassengerRide) {
      return res.status(404).json({ error: "Passenger ride not found" });
    }

    res.json(updatedPassengerRide);
  } catch (error) {
    res.status(500).json({ error: "Failed to update passenger ride status" });
  }
});
