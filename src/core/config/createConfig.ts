import { ICast } from "../../interface/config/ICast";
import { IConfigObjectFull } from "../../interface/config/IConfigObjectFull";
import { IDefaults } from "../../interface/config/IDefaults";
import { INullish } from "../../interface/config/INullish";
import { IRename } from "../../interface/config/IRename";
import { IReplace } from "../../interface/config/IReplace";
import { ITransform } from "../../interface/config/ITransform";

import { ESort } from "../../const/ESort";

import { objectCreateEmpty } from "../../util/object/createEmpty";

export function createConfig(): IConfigObjectFull {
  return {
    cast: objectCreateEmpty() as ICast,
    defaults: objectCreateEmpty() as IDefaults,
    defined: [],
    exclude: [],
    nullish: objectCreateEmpty() as INullish,
    omit: [],
    order: [],
    pick: [],
    sort: ESort.Default,
    rename: objectCreateEmpty() as IRename,
    replace: objectCreateEmpty() as IReplace,
    required: [],
    transform: objectCreateEmpty() as ITransform,
  };
}
