# Saraba : sources des photos

Relevé du 16 novembre 2026. Les originaux sont dans `assets/raw/` (photos réelles) et `assets/stock/` (photos libres de droits). Les versions web sont dans `public/media/`, préparées par `npm run media`. Next/image les sert ensuite en AVIF ou WebP, à la bonne taille.

**Total : 10 photos réelles du restaurant et 16 photos libres de droits.**

## Photos réelles du Saraba (10 fichiers web, tirés de 8 photos sources)

Ce sont des photos publiques du restaurant, publiées par des clients ou sur la fiche Google. Elles n'ont **pas de licence explicite** : elles sont à faire valider par le restaurant, ou à remplacer par ses propres photos (voir INFOS-A-DEMANDER.md). Les visages de clients ont été écartés ou recadrés.

| Fichier web | Contenu | Source |
|---|---|---|
| `hero/salle-ardoise-nuit.jpg` | La salle le soir, l'ardoise et l'église Saint-Leu | Fiche Google, via saraba-restaurant-africain.wheree.com |
| `plats/ardoise-plats.jpg` | Recadrage de l'ardoise (prix) | Même photo |
| `salle/salle-masques-bambou.jpg` | Recadrage du mur bambou et du masque (plus utilisé sur le site) | Même photo |
| `facade/chevalet-rue.jpg` | Le chevalet dans la rue, devant l'église | Fiche Google, via wheree.com |
| `plats/mafe-boeuf.jpg` | Mafé de bœuf et riz | Tripadvisor, photo « mafé de bœuf » (photo-o/1c/2a/c7/45) |
| `plats/yassa-poulet.jpg` | Yassa poulet aux oignons | Tripadvisor, photo « saraba » (photo-o/15/f2/82/6a) |
| `plats/planche-entrees.jpg` | Planche pastels et accras | Tripadvisor, photo « pastels miam miam » (photo-o/12/f5/53/36) |
| `salle/table-assiettes.jpg` | Assiette de mafé et verres sur une table | Tripadvisor, photo « saraba » (photo-o/1b/74/c0/b1) |
| `salle/cocktails.jpg` | Trois boissons au citron vert | Tripadvisor, photo « apéro » (photo-o/1c/14/8f/d9) |
| `salle/bar-masques.jpg` | Le comptoir peint de masques, recadré sans personne | wheree.com (photo Google), Saraba-Restaurant-Africain_fcf4630c… |

Écartées :
- les photos Restaurant Guru, qui portent un filigrane (mascotte) ;
- la photo du bar avec le barman, trop petite et où l'on voit un visage ;
- les selfies de clients ;
- les vues de rue où l'on ne reconnaît pas le restaurant.

## Photos libres de droits (16)

Toutes viennent d'**Unsplash** : [licence Unsplash](https://unsplash.com/license), usage commercial autorisé, attribution non obligatoire mais faite ici. Sur le site, chacune porte la mention « illustration » et un texte alternatif « photo d'illustration ». Une note sous la carte précise qu'elles ne montrent pas les plats du Saraba.

| Fichier web | Utilisé pour | Photographe Unsplash | Photo |
|---|---|---|---|
| `illustrations/accras.jpg` | Accras | @traveleroohlala | unsplash.com/photos/jp9k4i8eRr4 |
| `illustrations/alokos.jpg` | Alokos | @dzngriffin | unsplash.com/photos/iZizDMsDeIo |
| `illustrations/ailes-poulet.jpg` | Ailes de poulet | @scotteckersley | images.unsplash.com/photo-1608039755401-742074f0548d |
| `illustrations/pastels.jpg` | Pastels | @dori382 | unsplash.com/photos/7ntwSjz8HZE |
| `illustrations/thiou-gombo.jpg` | Thiou gombo ; actualité « thiou » | @keeshasskitchen | unsplash.com/photos/N_544vYDfwM |
| `illustrations/mafe-gombo.jpg` | Mafé gombo | @zoshuacolah | unsplash.com/photos/ZCCKQn0F81Q |
| `illustrations/boeuf-curry.jpg` | Bœuf curry | @sanketshah | unsplash.com/photos/eEWlcfydzQ4 |
| `illustrations/poisson-grille.jpg` | Poisson selon l'arrivage ; tuile « Poissons » | @milo_photo | unsplash.com/photos/hVnClpnYUUk |
| `illustrations/poisson-sauce.jpg` | Bourekhé (à confirmer) | @keeshasskitchen | unsplash.com/photos/uXcpPWc9bus |
| `illustrations/poisson-citron.jpg` | Actualité « poisson de l'arrivage » | @keeshasskitchen | unsplash.com/photos/KRbF_wsztBE |
| `illustrations/fondant.jpg` | Fondant ; tuile « Desserts » | @grissphoto | unsplash.com/photos/Pzjez86SsvQ |
| `illustrations/glaces.jpg` | Glaces | @courtneymcook | unsplash.com/photos/66IZaW9LIpI |
| `illustrations/jus-rouge.jpg` | Jus maison | @shootdelicious | unsplash.com/photos/kOoMCheZesE |
| `illustrations/sodas.jpg` | Sodas | @einjasper | unsplash.com/photos/rJPY9L2f_SM |
| `illustrations/eau.jpg` | Eaux | @greg_rosenke | unsplash.com/photos/hpHM0OlOHT0 |
| `illustrations/the-menthe.jpg` | Boissons chaudes | @jaidaquinn | unsplash.com/photos/Bmek6EYG9Uk |

## Pour remplacer une illustration par une vraie photo

1. Déposez la photo dans `assets/raw/` (par exemple `saraba_accras.jpg`).
2. Ajoutez une ligne dans `PICKS` (`scripts/media.mjs`), dans la catégorie `plats`.
3. Lancez `npm run media`.
4. Changez le chemin `image` du plat dans `data/carte.json`, puis ajoutez son texte alternatif dans `locales/*.json` → `alt`.
