import { ContributorPercentageCalculator } from './ContributorPercentageCalculator';

const PORT = 5000;

const calculator = new ContributorPercentageCalculator();
calculator.listen(PORT, () => console.log(`Listening on port ${PORT}`));
