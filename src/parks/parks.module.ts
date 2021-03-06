import { HttpModule, Module } from '@nestjs/common';
import { EftelingModule } from './efteling/efteling.module';
import { ToverlandModule } from './toverland/toverland.module';
import { PhantasialandModule } from './phantasialand/phantasialand.module';
import { ParcAsterixModule } from './parc-asterix/parc-asterix.module';
import { HolidayParkModule } from './holiday-park/holiday-park.module';
import { DippiedoeModule } from './dippiedoe/dippiedoe.module';
import { DisneyModule } from './disney/disney.module';
import { WalibiModule } from './walibi/walibi.module';
import { PortaventuraModule } from './portaventura/portaventura.module';
import { SixflagsModule } from './sixflags/sixflags.module';
import { BellewaerdeModule } from './bellewaerde/bellewaerde.module';
import { HellendoornModule } from './hellendoorn/hellendoorn.module';
import { LegolandModule } from './legoland/legoland.module';
import { BobbejaanlandModule } from './bobbejaanland/bobbejaanland.module';
import { PlopsalandDePanneModule } from './plopsaland/plopsaland-de-panne/plopsaland-de-panne.module';
import { EuropaParkModule } from './europa-park/europa-park.module';
import { HansaParkModule } from './hansa-park/hansa-park.module';
import { OuwehandsDierenparkModule } from './ouwehands-dierenpark/ouwehands-dierenpark.module';
import { WildlandsModule } from './wildlands/wildlands.module';
import { LisebergModule } from './liseberg/liseberg.module';
import { HerschendModule } from './herschend/herschend.module';
import { CedarfairModule } from './cedarfair/cedarfair.module';
import { ParqueWarnerModule } from './parque-warner/parque-warner.module';

@Module({
  imports: [HttpModule, EftelingModule, ToverlandModule, PhantasialandModule, ParcAsterixModule, HolidayParkModule, DippiedoeModule, DisneyModule, WalibiModule, PortaventuraModule, SixflagsModule, BellewaerdeModule, HellendoornModule, LegolandModule, BobbejaanlandModule, PlopsalandDePanneModule, EuropaParkModule, HansaParkModule, OuwehandsDierenparkModule, WildlandsModule, LisebergModule, HerschendModule, CedarfairModule, ParqueWarnerModule],
  exports: [EftelingModule, ToverlandModule, PhantasialandModule, ParcAsterixModule, HolidayParkModule, DippiedoeModule, DisneyModule, WalibiModule, PortaventuraModule, SixflagsModule, BellewaerdeModule, HellendoornModule, LegolandModule, BobbejaanlandModule, PlopsalandDePanneModule, EuropaParkModule, HansaParkModule, OuwehandsDierenparkModule, WildlandsModule, LisebergModule, HerschendModule, CedarfairModule, ParqueWarnerModule],
})
export class ParksModule {}
