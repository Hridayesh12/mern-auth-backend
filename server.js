import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import routes from './routes/index.js';
import connectDB from './config/db.js';


const app = express();

const PORT = config.PORT || 5000;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }),
);
app.use('/', routes);

// app.get('/', (req, res) => {
//   res.status(200);
// });

app.get('/', (req, res) => {
    return res.json({ message: 'Hello World' }).status(200);
});
connectDB().then(() => {
    app.listen(PORT, () =>
        console.log(`Server running on port ${PORT} in ${config.NODE_ENV} mode`),
    )
});

