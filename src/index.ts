import Garage from './page/garage';
import Winners from './page/winners';
import Router from './router/router';
import evaluation from './utils/selfEvaluation';
import './index.scss';

const router = new Router({
  garage: new Garage(),
  winners: new Winners(),
})

evaluation();
router.init();

