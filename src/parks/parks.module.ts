import { Module } from '@nestjs/common';
import { EftelingModule } from './efteling/efteling.module';
import { ToverlandModule } from './toverland/toverland.module';
import { PhantasialandModule } from './phantasialand/phantasialand.module';
import { ParcAsterixModule } from './parc-asterix/parc-asterix.module';
import { DippiedoeModule } from './dippiedoe/dippiedoe.module';
import { DisneyModule } from './disney/disney.module';
import { WalibiModule } from './walibi/walibi.module';
import { PortaventuraModule } from './portaventura/portaventura.module';
import { SixflagsModule } from './sixflags/sixflags.module';
import { BellewaerdeModule } from './bellewaerde/bellewaerde.module';
import { HellendoornModule } from './hellendoorn/hellendoorn.module';
import { EuropaParkModule } from './europa-park/europa-park.module';
import { HansaParkModule } from './hansa-park/hansa-park.module';
import { OuwehandsDierenparkModule } from './ouwehands-dierenpark/ouwehands-dierenpark.module';
import { WildlandsModule } from './wildlands/wildlands.module';
import { LisebergModule } from './liseberg/liseberg.module';
import { HerschendModule } from './herschend/herschend.module';
import { CedarfairModule } from './cedarfair/cedarfair.module';
import { ParqueWarnerModule } from './parque-warner/parque-warner.module';
import { GronaLundModule } from './grona-lund/grona-lund.module';
import { TivoliModule } from './tivoli/tivoli.module';
import { ThorpeParkModule } from './thorpe-park/thorpe-park.module';
import { AltonTowersModule } from './alton-towers/alton-towers.module';
import { PaultonsParkModule } from './paultons-park/paultons-park.module';
import { SanDiegoZooModule } from './san-diego-zoo/san-diego-zoo.module';
import { ChessingtonResortModule } from './chessington-resort/chessington-resort.module';
import { BlijdorpModule } from './blijdorp/blijdorp.module';
import { ApenheulModule } from './apenheul/apenheul.module';
import { EnergylandiaModule } from './energylandia/energylandia.module';
import { FamilyparkModule } from './familypark/familypark.module';
import { BeekseBergenModule } from './beekse-bergen/beekse-bergen.module';
import { FuturoscopeModule } from './futuroscope/futuroscope.module';
import { ParquesReunidosModule } from './parques-reunidos/parques-reunidos.module';
import { HersheyparkModule } from './hersheypark/hersheypark.module';
import { SeaworldModule } from './seaworld/seaworld.module';
import { UniversalModule } from './universal/universal.module';
import { CompagnieDesAlpesModule } from './compagnie-des-alpes/compagnie-des-alpes.module';
import { MerlinEntertainmentsModule } from './merlin-entertainments/merlin-entertainments.module';
import { PairiDaizaModule } from './pairi-daiza/pairi-daiza.module';
import { DjursSommerlandModule } from './djurs-sommerland/djurs-sommerland.module';
import { PuyDeFouModule } from './puy-de-fou/puy-de-fou.module';
import { PlopsaModule } from './plopsa/plopsa.module';
import { ArtisModule } from './artis/artis.module';

@Module({
  exports: [EftelingModule, ToverlandModule, PhantasialandModule, ParcAsterixModule, DippiedoeModule, DisneyModule, WalibiModule, PortaventuraModule, SixflagsModule, BellewaerdeModule, HellendoornModule, EuropaParkModule, HansaParkModule, OuwehandsDierenparkModule, WildlandsModule, LisebergModule, HerschendModule, CedarfairModule, ParqueWarnerModule, GronaLundModule, TivoliModule, ThorpeParkModule, AltonTowersModule, PaultonsParkModule, SanDiegoZooModule, ChessingtonResortModule, BlijdorpModule, ApenheulModule, EnergylandiaModule, FamilyparkModule, BeekseBergenModule, ParquesReunidosModule, FuturoscopeModule, HersheyparkModule, SeaworldModule, UniversalModule, CompagnieDesAlpesModule, MerlinEntertainmentsModule, PairiDaizaModule, DjursSommerlandModule, PuyDeFouModule, PlopsaModule, ArtisModule],
  imports: [EftelingModule, ToverlandModule, PhantasialandModule, ParcAsterixModule, DippiedoeModule, DisneyModule, WalibiModule, PortaventuraModule, SixflagsModule, BellewaerdeModule, HellendoornModule, EuropaParkModule, HansaParkModule, OuwehandsDierenparkModule, WildlandsModule, LisebergModule, HerschendModule, CedarfairModule, ParqueWarnerModule, GronaLundModule, TivoliModule, ThorpeParkModule, AltonTowersModule, PaultonsParkModule, SanDiegoZooModule, ChessingtonResortModule, BlijdorpModule, ApenheulModule, EnergylandiaModule, FamilyparkModule, BeekseBergenModule, ParquesReunidosModule, FuturoscopeModule, HersheyparkModule, SeaworldModule, UniversalModule, CompagnieDesAlpesModule, MerlinEntertainmentsModule, PairiDaizaModule, DjursSommerlandModule, PuyDeFouModule, PlopsaModule, ArtisModule],
})
export class ParksModule {}
