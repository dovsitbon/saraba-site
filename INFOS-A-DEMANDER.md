# Saraba : informations à demander au restaurant

À demander au propriétaire pour compléter le site. Chaque réponse se reporte dans le fichier indiqué.

## Le restaurant
- [ ] **Prénom du chef ou de la cheffe et son histoire** : depuis quand, pourquoi Amiens, la recette de famille. Pour le bloc « Notre histoire » (`locales/*.json` → `blocks.histoire`).
- [ ] **Pays d'origine** : Sénégal seulement, ou d'autres pays (Gambie, Guinée, Mali…) ? Le site parle de cuisine sénégalaise et d'Afrique de l'Ouest.
- [ ] **Logo** : en existe-t-il un ? Le site utilise un logo typographique provisoire (`public/logo.svg`, `components/Logo.tsx`).

## Carte et prix (`data/carte.json`)
- [ ] **Carte complète avec les prix actuels** : les prix ont été relevés sur une photo de l'ardoise et ont pu changer.
- [ ] **Le plat de poisson noté « Bourekhé »** : quel est son vrai nom ?
- [ ] **Boissons** : jus maison (bissap, gingembre, bouye ?), sodas, eaux, boissons chaudes, avec leurs prix.
- [ ] **Desserts** : la liste complète. Le site affiche aujourd'hui fondant et glaces.
- [ ] **Plats qu'on ne voit plus sur l'ardoise** : domoda, fatayas, poisson frit riz… sont-ils encore servis ?
- [ ] Viande **halal** ? Le site ne le dit pas tant que ce n'est pas confirmé.

## Horaires et capacité (`data/horaires.json`, `data/site.json`)
- [ ] **Horaires exacts** : du mardi au samedi, 19 h – minuit ? Ouvert le midi ou le dimanche ?
- [ ] **Fermetures annuelles** : congés d'été, Noël, jour de l'an.
- [ ] **Nombre de places**, terrasse, et taille maximale d'un groupe. Le site annonce « groupes dès 8 personnes » et accepte jusqu'à 30 couverts.

## Coordonnées
- [ ] **Téléphone** : le site affiche 03 22 45 17 69. Une ancienne page en ligne indique **03 22 85 17 69** : lequel est le bon ?
- [ ] **Numéro mobile pour WhatsApp**, s'il y en a un. Il permettrait d'ajouter un bouton WhatsApp.
- [ ] **E-mail** pour recevoir les réservations. Une ancienne page indique sarabava13@gmail.com : est-il encore utilisé ?

## Photos (`assets/a-photographier/`)
- [ ] **Photos des plats** : mafé, yassa, thiou, poisson, accras, planche. Lumière du jour, vue de dessus ou de trois quarts.
- [ ] **Photos de la salle** de jour et de nuit, et de la devanture.
- [ ] Photos du chef ou de la cheffe, uniquement avec son accord. Aucun visage de client.

## Légal (`data/site.json` → `legal`)
- [ ] **SIRET**.
- [ ] À confirmer : raison sociale « Le Saraba », capital 3 000 €, RCS Amiens 823 315 643, gérant M. Matar Diallo. Ces informations viennent d'une ancienne page en ligne.

## Réservation en ligne (Vercel → Environment Variables)
- [ ] Créer un compte **Resend** et renseigner `RESEND_API_KEY`, `BOOKING_NOTIFY_EMAIL` (l'e-mail du restaurant) et `RESEND_FROM`. Sans ces clés, le formulaire invite à appeler le restaurant.
