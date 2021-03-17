import { ICast } from "./ICast";
import { IDefaults } from "./IDefaults";
import { IDefined } from "./IDefined";
import { IExclude } from "./IExclude";
import { INullish } from "./INullish";
import { IOmit } from "./IOmit";
import { IOrder } from "./IOrder";
import { IPick } from "./IPick";
import { IRename } from "./IRename";
import { IReplace } from "./IReplace";
import { IRequired } from "./IRequired";
import { ITransform } from "./ITransform";

import { ESort } from "../../const/ESort";

export interface IConfigObjectFull {
  cast?: ICast;
  defaults?: IDefaults;
  defined?: IDefined;
  exclude?: IExclude;
  nullish?: INullish;
  omit?: IOmit;
  order?: IOrder;
  pick?: IPick;
  sort?: boolean | ESort;
  rename?: IRename;
  replace?: IReplace;
  required?: IRequired;
  transform?: ITransform;
}
