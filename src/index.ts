import {Calc} from './Calc';

const PORT = 5000;

const calculator = new Calc();
calculator.listen(PORT, () => console.log(`Listening on port ${PORT}`));
