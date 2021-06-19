import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import brgyAgdangan from '../../others/brgyAgdangan'
import brgyAlabat from '../../others/brgyAlabat';
import brgyAtimonan from '../../others/brgyAtimonan';
import brgyBuenavista from '../../others/brgyBuenavista';
import brgyBurdeos from '../../others/brgyBurdeos';
import brgyCalauag from '../../others/brgyCalauag';
import brgyCandelaria from '../../others/brgyCandelaria';
import brgyCatanauan from '../../others/brgyCatanauan';
import brgyDolores from '../../others/brgyDolores';
import brgyGeneralLuna from '../../others/brgyGeneralLuna';
import brgyGeneralNakar from '../../others/brgyGeneralNakar';
import brgyGuinayangan from '../../others/brgyGuinayangan';
import brgyGumaca from '../../others/brgyGumaca';
import brgyInfanta from '../../others/brgyInfanta';
import brgyJomalig from '../../others/brgyJomalig';
import brgyLopez from '../../others/brgyLopez';
import brgyLucban from '../../others/brgyLucban';
import brgyLucena from '../../others/brgyLucena';
import brgyMacalelon from '../../others/brgyMacalelon';
import brgyMauban from '../../others/brgyMauban';
import brgyMulanay from '../../others/brgyMulanay';
import brgyPadreBurgos from '../../others/brgyPadreBurgos';
import brgyPagbilao from '../../others/brgyPagbilao';
import brgyPanukulan from '../../others/brgyPanukulan';
import brgyPatnanungan from '../../others/brgyPatnanungan';
import brgyPerez from '../../others/brgyPerez';
import brgyPitogo from '../../others/brgyPitogo';
import brgyPlaridel from '../../others/brgyPlaridel';
import brgyPolillo from '../../others/brgyPolillo';
import brgyQuezon from '../../others/brgyQuezon';
import brgyReal from '../../others/brgyReal';
import brgySampaloc from '../../others/brgySampaloc';
import brgySanAndres from '../../others/brgySanAndres';
import brgySanAntonio from '../../others/brgySanAntonio';
import brgySanFrancisco from '../../others/brgySanFrancisco';
import brgySanNarciso from '../../others/brgySanNarciso';
import brgySariaya from '../../others/brgySariaya';
import brgyTagkawayan from '../../others/brgyTagkawayan';
import brgyTayabas from '../../others/brgyTayabas';
import brgyTiaong from '../../others/brgyTiaong';
import brgyUnisan from '../../others/brgyUnisan';

const Signup_SelectBaranggay = ({town, brgy, isTownSelected, brgyError, handleBrgyChange, classes}) => {
  return (
    <FormControl required fullWidth className={classes.formControl}>
      <InputLabel>Baranggay</InputLabel>
      <Select 
        disabled={!isTownSelected}
        value={brgy}
        error={brgyError}
        onChange={handleBrgyChange}
      >
        {town === 'Agdangan' && brgyAgdangan.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Alabat' && brgyAlabat.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Atimonan' && brgyAtimonan.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Buenavista' && brgyBuenavista.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Burdeos' && brgyBurdeos.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Calauag' && brgyCalauag.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Candelaria' && brgyCandelaria.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Catanauan' && brgyCatanauan.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Dolores' && brgyDolores.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'General Luna' && brgyGeneralLuna.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'General Nakar' && brgyGeneralNakar.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Guinayangan' && brgyGuinayangan.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Gumaca' && brgyGumaca.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Infanta' && brgyInfanta.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Jomalig' && brgyJomalig.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Lopez' && brgyLopez.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Lucban' && brgyLucban.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Lucena' && brgyLucena.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Macalelon' && brgyMacalelon.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Mauban' && brgyMauban.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Mulanay' && brgyMulanay.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Padre Burgos' && brgyPadreBurgos.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Pagbilao' && brgyPagbilao.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Panukulan' && brgyPanukulan.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Patnanungan' && brgyPatnanungan.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Perez' && brgyPerez.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Pitogo' && brgyPitogo.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Plaridel' && brgyPlaridel.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Polillo' && brgyPolillo.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Quezon' && brgyQuezon.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Real' && brgyReal.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Sampaloc' && brgySampaloc.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'San Andres' && brgySanAndres.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'San Antonio' && brgySanAntonio.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'San Francisco' && brgySanFrancisco.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'San Narciso' && brgySanNarciso.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Sariaya' && brgySariaya.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Tagkawayan' && brgyTagkawayan.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Tayabas' && brgyTayabas.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Tiaong' && brgyTiaong.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
        {town === 'Unisan' && brgyUnisan.map((brgy) => (
          <MenuItem value={brgy} key={brgy}>{brgy}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
 
export default Signup_SelectBaranggay;