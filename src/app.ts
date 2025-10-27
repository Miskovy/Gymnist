import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

// Import routes
import traineeRoutes from './trainee/routes';
import trainerRoutes from './trainer/routes';
import locationRoutes from './location/routes';
import packageRoutes from './package/routes';
import paymentMethodRoutes from './payment-method/routes';
import classRoutes from './class/routes';
import subscriptionRoutes from './subscription/routes';
import majorRoutes from './major/routes';
//import roomRoutes from './room/routes';

const app: Express = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/trainees', traineeRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/payment-methods', paymentMethodRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/majors', majorRoutes);
//app.use('/api/rooms', roomRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

export default app;