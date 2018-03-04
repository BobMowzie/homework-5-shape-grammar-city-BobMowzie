import Shape from './Shape';

class Rule {
    successors: Shape[];
    probability: number;
    populationDependence: number;

    constructor(successors: Shape[], probability: number, populationDependence: number) {
        this.successors = successors;
        this.probability = probability;
        this.populationDependence = populationDependence;
    }
}

export default Rule;