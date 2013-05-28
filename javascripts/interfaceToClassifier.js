// this interfaces the app with Bayesian classifier script
var bayes = new classifier.Bayesian();


function calculateBayesianScore(textToAnalyse){

bayesianOb = bayes.getProbsSync(textToAnalyse);

inteOverBori = (bayesianOb.interesting / bayesianOb.boring);


boringnessProportion = (bayesianOb.boring / (bayesianOb.boring + bayesianOb.interesting));
return boringnessProportion;



}