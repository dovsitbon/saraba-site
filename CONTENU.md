# Saraba Restaurant Africain : contenu du site, pour validation

Tous les textes en français et en anglais, et la carte avec les prix. Les points **À VALIDER** sont à confirmer avec le restaurant.
Fichier généré par `npm run contenu` à partir de `locales/*.json` et `data/*.json` : modifiez ces fichiers, pas celui-ci.

## Titre du hero : 3 propositions

1. **Un voyage dans l'assiette** (retenu sur le site : la formule revient dans les avis Google)
2. **Le goût du Sénégal, rue des Majots**
3. **Mafé, yassa et sourires**

Pour changer : `locales/fr.json` → `hero.title` (et `locales/en.json`).

## À valider en priorité

- **Téléphone** : le site affiche 03 22 45 17 69 (numéro du brief). Une ancienne page du restaurant (eatbu) indique 03 22 85 17 69 : lequel est le bon ?
- **Prix** : relevés sur l'ardoise visible sur une photo publique (Google). Ils ont pu changer.
- **« Bourekhé »** (poisson, 18 €) : intitulé mal lisible sur l'ardoise, à confirmer.
- **Boissons** : jus maison (bissap, gingembre ?), sodas, eaux, boissons chaudes : liste et prix à remplir.
- **Horaires** : du mardi au samedi, 19 h – minuit (brief). Fermetures du 25 décembre et du 1er janvier supposées.
- **Mentions légales** : Le Saraba, RCS Amiens 823 315 643, M. Matar Diallo : relevés sur l'ancienne page eatbu, à confirmer ; SIRET à fournir.
- **Avis clients** : aucun avis n'a été inventé. La section affiche la note Google et un lien ; à remplir avec de vrais avis (`data/avis.json`) si le restaurant le souhaite.
- **Réservation en ligne** : le formulaire envoie un e-mail via Resend. Clés à configurer sur Vercel (`RESEND_API_KEY`, `BOOKING_NOTIFY_EMAIL`, `RESEND_FROM`). En attendant, il invite à appeler.

## Carte et prix

### Entrées · Starters

_Pour commencer, ou pour partager à plusieurs avec une planche._

| Plat (fr) | Description | Prix sur place | À emporter | English |
|---|---|---|---|---|
| Accras | Petits beignets croustillants, à partager ou non. | 7 € |  | Accras |
| Alokos | Bananes plantains frites, dorées et fondantes. | 7 € |  | Alokos |
| Ailes de poulet | Marinées et grillées. | 7 € |  | Chicken wings |
| Pastels | Chaussons frits farcis, servis avec leur sauce. | 7 € |  | Pastels |
| Planche à partager | Deux ou trois garnitures au choix : 14 € ou 21 €. | à partir de 14 € |  | Sharing board |

### Plats · Mains

_Les grands classiques mijotés, servis généreusement. Tous à 14 € sur place._

| Plat (fr) | Description | Prix sur place | À emporter | English |
|---|---|---|---|---|
| Mafé de bœuf | Le plat que l'on vient manger ici : bœuf mijoté dans une sauce à l'arachide. | 14 € | 12 € | Beef mafé |
| Yassa poulet | Poulet mariné au citron, confit d'oignons. | 14 € | 12 € | Chicken yassa |
| Thiou gombo | Ragoût mijoté au gombo. | 14 € |  | Thiou with okra |
| Mafé gombo | Le mafé, avec du gombo. | 14 € |  | Okra mafé |
| Bœuf curry | Bœuf mijoté au curry. | 14 € | 12 € | Beef curry |

### Poissons · Fish

_Grillés entiers, selon l'arrivage du jour. Sur place uniquement._

| Plat (fr) | Description | Prix sur place | À emporter | English |
|---|---|---|---|---|
| Bar ou dorade | Grillé entier, selon l'arrivage. | 18 € |  | Sea bass or sea bream |
| Bourekhé **À VALIDER** | Spécialité de poisson de la maison. | 18 € |  | Bourekhé |

### Desserts · Desserts

_Une petite douceur pour finir._

| Plat (fr) | Description | Prix sur place | À emporter | English |
|---|---|---|---|---|
| Fondant au chocolat |  | 5 € |  | Chocolate fondant |
| Glaces | Deux boules 3 €, trois boules 4,50 €. | à partir de 3 € |  | Ice cream |

### Boissons · Drinks

_Les boissons et leurs prix sont à demander en salle, la carte arrive bientôt ici._

| Plat (fr) | Description | Prix sur place | À emporter | English |
|---|---|---|---|---|
| Jus maison **À VALIDER** | Selon le jour, demandez ce qui est prêt. | prix en salle (à remplir) |  | Homemade juices |
| Sodas |  | prix en salle (à remplir) |  | Soft drinks |
| Eaux plates et gazeuses |  | prix en salle (à remplir) |  | Still and sparkling water |
| Café et thé |  | prix en salle (à remplir) |  | Coffee and tea |

## Horaires (data/horaires.json)

- Lundi : fermé
- Mardi : 19:00 – minuit
- Mercredi : 19:00 – minuit
- Jeudi : 19:00 – minuit
- Vendredi : 19:00 – minuit
- Samedi : 19:00 – minuit
- Dimanche : fermé
- Exception 2026-12-25 : fermé
- Exception 2027-01-01 : fermé

## Bandeau d'annonces (data/annonces.json)

- **fetes-2026** (2026-12-15 → 2027-01-01)
  - fr : Fêtes de fin d'année : fermé le 25 décembre et le 1er janvier. Pensez à réserver vos tables.
  - en : Holiday season: closed on 25 December and 1 January. Book your table early.
- **conges-exemple** (2027-08-01 → 2027-08-21) · désactivée
  - fr : Le Saraba est en congés du 1er au 21 août. À très vite rue des Majots !
  - en : Saraba is closed for holidays from 1 to 21 August. See you soon on rue des Majots!
- **ouvert** (par défaut)
  - fr : Ouvert du mardi au samedi dès 19 h. Le week-end, pensez à réserver.
  - en : Open Tuesday to Saturday from 7 pm. Booking recommended at weekends.

## Tous les textes du site

### meta

- `meta.title`
  - fr : Restaurant africain à Amiens, rue des Majots | Saraba
  - en : African restaurant in Amiens, rue des Majots | Saraba
- `meta.description`
  - fr : Saraba, restaurant africain et sénégalais à Saint-Leu, Amiens : mafé, yassa, thiou, poisson selon l'arrivage. Le soir, du mardi au samedi. Réservez en ligne.
  - en : Saraba, African and Senegalese restaurant in Saint-Leu, Amiens: mafé, yassa, thiou, fish of the day. Evenings, Tuesday to Saturday. Book your table online.
- `meta.ogAlt`
  - fr : Saraba, restaurant africain rue des Majots à Amiens
  - en : Saraba, African restaurant on rue des Majots in Amiens

### nav

- `nav.skip`
  - fr : Aller au contenu
  - en : Skip to content
- `nav.menu`
  - fr : Menu
  - en : Menu
- `nav.close`
  - fr : Fermer le menu
  - en : Close menu
- `nav.home`
  - fr : Saraba, accueil
  - en : Saraba, home
- `nav.carte`
  - fr : La carte
  - en : Menu
- `nav.book`
  - fr : Réserver
  - en : Book
- `nav.groups`
  - fr : Groupes
  - en : Groups
- `nav.infos`
  - fr : Infos
  - en : Info
- `nav.gift`
  - fr : Bon cadeau
  - en : Gift voucher
- `nav.call`
  - fr : Appeler
  - en : Call
- `nav.directions`
  - fr : Itinéraire
  - en : Directions
- `nav.bookCta`
  - fr : Réserver une table
  - en : Book a table
- `nav.lang`
  - fr : Langue
  - en : Language
- `nav.facebook`
  - fr : Saraba sur Facebook
  - en : Saraba on Facebook

### announce

- `announce.close`
  - fr : Fermer l'annonce
  - en : Close announcement

### intro

- `intro.skip`
  - fr : Passer
  - en : Skip
- `intro.line`
  - fr : RESTAURANT AFRICAIN · AMIENS
  - en : AFRICAN RESTAURANT · AMIENS

### hero

- `hero.eyebrow`
  - fr : Restaurant africain · rue des Majots, Amiens
  - en : African restaurant · rue des Majots, Amiens
- `hero.title`
  - fr : Un voyage dans l'assiette
  - en : A journey on a plate
- `hero.lead`
  - fr : Mafé, yassa, thiou gombo et poisson selon l'arrivage, servis le soir dans une petite salle de Saint-Leu, à deux pas de l'église.
  - en : Mafé, yassa, thiou with okra and fish of the day, served in the evening in a small dining room in Saint-Leu, a stone's throw from the church.
- `hero.ctaBook`
  - fr : Réserver une table
  - en : Book a table
- `hero.ctaMenu`
  - fr : Voir la carte
  - en : See the menu
- `hero.rating`
  - fr : {value}/5 sur Google
  - en : {value}/5 on Google
- `hero.ratingCount`
  - fr : {count} avis
  - en : {count} reviews
- `hero.imageAlt`
  - fr : La salle du Saraba le soir : murs de bambou, masques sculptés et l'ardoise du jour devant la fenêtre
  - en : Saraba's dining room at night: bamboo walls, carved masks and the day's chalkboard by the window

### tiles

- `tiles.title`
  - fr : Ce soir, à la carte
  - en : Tonight on the menu
- `tiles.entrees`
  - fr : Entrées
  - en : Starters
- `tiles.entreesSub`
  - fr : Accras, alokos, pastels
  - en : Accras, alokos, pastels
- `tiles.plats`
  - fr : Plats
  - en : Mains
- `tiles.platsSub`
  - fr : Mafé, yassa, thiou
  - en : Mafé, yassa, thiou
- `tiles.poissons`
  - fr : Poissons & grillades
  - en : Fish & grills
- `tiles.poissonsSub`
  - fr : Bar ou dorade
  - en : Sea bass or sea bream
- `tiles.desserts`
  - fr : Desserts
  - en : Desserts
- `tiles.dessertsSub`
  - fr : Fondant, glaces
  - en : Chocolate fondant, ice cream
- `tiles.boissons`
  - fr : Boissons
  - en : Drinks
- `tiles.boissonsSub`
  - fr : Jus maison, softs
  - en : Homemade juices, soft drinks

### services

- `services.title`
  - fr : Le Saraba en bref
  - en : Saraba at a glance
- `services.soir.title`
  - fr : Le soir
  - en : Evenings
- `services.soir.text`
  - fr : Du mardi au samedi, de 19 h à minuit.
  - en : Tuesday to Saturday, 7 pm to midnight.
- `services.reservation.title`
  - fr : Sur réservation
  - en : Bookings
- `services.reservation.text`
  - fr : En ligne en deux minutes, ou par téléphone.
  - en : Online in two minutes, or by phone.
- `services.groupes.title`
  - fr : Groupes
  - en : Groups
- `services.groupes.text`
  - fr : Anniversaires et tablées dès 8 personnes.
  - en : Birthdays and big tables from 8 guests.
- `services.emporter.title`
  - fr : À emporter
  - en : Takeaway
- `services.emporter.text`
  - fr : Mafé, yassa et curry à 12 €.
  - en : Mafé, yassa and curry at €12.

### carte

- `carte.eyebrow`
  - fr : La carte
  - en : The menu
- `carte.title`
  - fr : Les plats de la maison
  - en : House dishes
- `carte.lead`
  - fr : Une carte courte, cuisinée chaque soir. La viande est d'origine France.
  - en : A short menu, cooked fresh every evening. All meat is from France.
- `carte.tabsLabel`
  - fr : Rubriques de la carte
  - en : Menu sections
- `carte.categories.entrees`
  - fr : Entrées
  - en : Starters
- `carte.categories.plats`
  - fr : Plats
  - en : Mains
- `carte.categories.poissons`
  - fr : Poissons
  - en : Fish
- `carte.categories.desserts`
  - fr : Desserts
  - en : Desserts
- `carte.categories.boissons`
  - fr : Boissons
  - en : Drinks
- `carte.intro.entrees`
  - fr : Pour commencer, ou pour partager à plusieurs avec une planche.
  - en : To start, or to share with a board for the table.
- `carte.intro.plats`
  - fr : Les grands classiques mijotés, servis généreusement. Tous à 14 € sur place.
  - en : Slow-cooked classics, served generously. All €14 in the restaurant.
- `carte.intro.poissons`
  - fr : Grillés entiers, selon l'arrivage du jour. Sur place uniquement.
  - en : Grilled whole, depending on the day's catch. Eat in only.
- `carte.intro.desserts`
  - fr : Une petite douceur pour finir.
  - en : Something sweet to finish.
- `carte.intro.boissons`
  - fr : Les boissons et leurs prix sont à demander en salle, la carte arrive bientôt ici.
  - en : Ask for drinks and prices in the restaurant; the full list is coming here soon.
- `carte.signature`
  - fr : La spécialité
  - en : House speciality
- `carte.veg`
  - fr : Végétarien
  - en : Vegetarian
- `carte.priceInRoom`
  - fr : Prix en salle
  - en : Price in the restaurant
- `carte.from`
  - fr : à partir de
  - en : from
- `carte.takeaway`
  - fr : {price} à emporter
  - en : {price} to take away
- `carte.checked`
  - fr : Prix relevés le {date}, à titre indicatif : la carte du jour fait foi.
  - en : Prices noted on {date}, for guidance only: the day's chalkboard applies.
- `carte.seeAll`
  - fr : Voir toute la carte
  - en : See the full menu
- `carte.takeawayNote`
  - fr : À emporter : mafé, yassa et bœuf curry à 12 €. Les poissons se dégustent sur place.
  - en : Takeaway: mafé, yassa and beef curry at €12. Fish is served in the restaurant only.

### news

- `news.eyebrow`
  - fr : En ce moment
  - en : Right now
- `news.title`
  - fr : Au Saraba cette semaine
  - en : This week at Saraba

### blocks

- `blocks.specialites.eyebrow`
  - fr : Les spécialités
  - en : Specialities
- `blocks.specialites.title`
  - fr : Le mafé, et tout ce qui l'entoure
  - en : Mafé, and everything around it
- `blocks.specialites.text`
  - fr : Sauce à l'arachide longuement mijotée, poulet yassa au citron, thiou au gombo : des plats généreux, cuisinés comme à la maison. Et s'il en reste, on vous prépare de quoi emporter.
  - en : Slow-simmered peanut sauce, lemony chicken yassa, thiou with okra: generous dishes, cooked the way they are at home. And if there's some left, we'll pack it for you to take away.
- `blocks.specialites.cta`
  - fr : Voir la carte
  - en : See the menu
- `blocks.specialites.imageAlt`
  - fr : L'ardoise du Saraba : mafé bœuf, yassa poulet, thiou gombo, mafé gombo et bœuf curry
  - en : Saraba's chalkboard: beef mafé, chicken yassa, thiou with okra, okra mafé and beef curry
- `blocks.groupes.eyebrow`
  - fr : Groupes & anniversaires
  - en : Groups & birthdays
- `blocks.groupes.title`
  - fr : À plusieurs, c'est encore meilleur
  - en : Even better together
- `blocks.groupes.text`
  - fr : Un anniversaire, une sortie entre collègues, une grande famille ? Dès 8 personnes, dites-nous l'occasion : on prépare la table et on compose le repas avec vous.
  - en : A birthday, a night out with colleagues, a big family dinner? From 8 guests, tell us the occasion: we'll set up the table and plan the meal with you.
- `blocks.groupes.cta`
  - fr : Réserver
  - en : Book
- `blocks.groupes.panelBig`
  - fr : Dès 8
  - en : From 8
- `blocks.groupes.panelSmall`
  - fr : personnes, sur réservation
  - en : guests, by booking
- `blocks.histoire.eyebrow`
  - fr : Notre histoire
  - en : Our story
- `blocks.histoire.title`
  - fr : Une petite salle à Saint-Leu
  - en : A small dining room in Saint-Leu
- `blocks.histoire.text`
  - fr : Rue des Majots, à deux pas de l'église Saint-Leu : des murs de bambou, des masques sculptés, une ardoise écrite à la main, et un accueil qui revient dans tous les avis. L'histoire du Saraba, nous la raconterons bientôt avec les mots de la maison.
  - en : On rue des Majots, a stone's throw from Saint-Leu church: bamboo walls, carved masks, a handwritten chalkboard, and a welcome that every review mentions. We'll soon tell Saraba's story in the house's own words.
- `blocks.histoire.cta`
  - fr : Nous trouver
  - en : Find us
- `blocks.histoire.imageAlt`
  - fr : Le chevalet du Saraba dans la rue, devant les pierres de l'église Saint-Leu
  - en : Saraba's street chalkboard, in front of the stones of Saint-Leu church

### book

- `book.eyebrow`
  - fr : Réservation
  - en : Bookings
- `book.title`
  - fr : Réserver une table
  - en : Book a table
- `book.lead`
  - fr : Choisissez votre soir et votre heure. Nous confirmons par téléphone ou par e-mail. Pour ce soir même, le plus simple reste d'appeler.
  - en : Pick your evening and time. We confirm by phone or email. For tonight, calling is quickest.
- `book.date`
  - fr : Date
  - en : Date
- `book.chooseDate`
  - fr : Choisir un soir
  - en : Choose an evening
- `book.time`
  - fr : Heure d'arrivée
  - en : Arrival time
- `book.chooseTime`
  - fr : Choisir une heure
  - en : Choose a time
- `book.noTimes`
  - fr : Plus de créneau ce soir-là, essayez un autre jour.
  - en : No times left that evening, try another day.
- `book.guests`
  - fr : Nombre de personnes
  - en : Number of guests
- `book.occasion`
  - fr : Occasion (facultatif)
  - en : Occasion (optional)
- `book.occasions.none`
  - fr : Pas d'occasion particulière
  - en : No particular occasion
- `book.occasions.birthday`
  - fr : Anniversaire
  - en : Birthday
- `book.occasions.family`
  - fr : Repas de famille
  - en : Family meal
- `book.occasions.company`
  - fr : Sortie entre collègues
  - en : Work night out
- `book.occasions.other`
  - fr : Autre
  - en : Other
- `book.groupHint`
  - fr : À partir de {n} personnes, nous vous rappelons pour organiser la table et le repas.
  - en : From {n} guests, we'll call you back to organise the table and the meal.
- `book.name`
  - fr : Nom
  - en : Name
- `book.phone`
  - fr : Téléphone
  - en : Phone
- `book.email`
  - fr : E-mail
  - en : Email
- `book.message`
  - fr : Message (facultatif)
  - en : Message (optional)
- `book.messagePh`
  - fr : Allergie, chaise haute, poisson à mettre de côté…
  - en : Allergies, high chair, a fish to keep aside…
- `book.submit`
  - fr : Envoyer ma demande
  - en : Send my request
- `book.sending`
  - fr : Envoi…
  - en : Sending…
- `book.callInstead`
  - fr : ou appelez-nous au
  - en : or call us on
- `book.privacy`
  - fr : Vos coordonnées servent uniquement à confirmer cette réservation. Elles ne sont ni conservées ni transmises.
  - en : Your details are only used to confirm this booking. They are neither stored nor shared.
- `book.errors.date`
  - fr : Choisissez un soir.
  - en : Choose an evening.
- `book.errors.time`
  - fr : Choisissez une heure.
  - en : Choose a time.
- `book.errors.name`
  - fr : Indiquez votre nom.
  - en : Enter your name.
- `book.errors.phone`
  - fr : Indiquez un numéro de téléphone valide.
  - en : Enter a valid phone number.
- `book.errors.email`
  - fr : Indiquez une adresse e-mail valide.
  - en : Enter a valid email address.
- `book.errors.server`
  - fr : La demande n'est pas partie. Réessayez, ou appelez-nous directement.
  - en : Your request didn't go through. Try again, or call us directly.
- `book.done.title`
  - fr : Merci, c'est noté
  - en : Thank you, it's noted
- `book.done.text`
  - fr : {name}, votre demande pour {when} est bien arrivée chez nous.
  - en : {name}, your request for {when} has reached us.
- `book.done.mail`
  - fr : Un récapitulatif vient de partir dans votre boîte e-mail. Nous vous confirmons la table au plus vite.
  - en : A summary is on its way to your inbox. We'll confirm your table very soon.
- `book.done.notSent`
  - fr : Pour être sûr d'avoir votre table, appelez-nous pour confirmer : nous n'avons pas encore pu recevoir la demande par e-mail.
  - en : To be sure of your table, please call us to confirm: we couldn't receive the request by email yet.
- `book.done.again`
  - fr : Faire une autre demande
  - en : Make another request
- `book.mail.subject`
  - fr : Demande de réservation
  - en : Booking request
- `book.mail.title`
  - fr : Nouvelle demande de réservation
  - en : New booking request
- `book.mail.when`
  - fr : Quand
  - en : When
- `book.mail.guests`
  - fr : Personnes
  - en : Guests
- `book.mail.occasion`
  - fr : Occasion
  - en : Occasion
- `book.mail.name`
  - fr : Nom
  - en : Name
- `book.mail.phone`
  - fr : Téléphone
  - en : Phone
- `book.mail.email`
  - fr : E-mail
  - en : Email
- `book.mail.message`
  - fr : Message
  - en : Message
- `book.mail.lang`
  - fr : Langue du client
  - en : Customer language
- `book.mail.confirmSubject`
  - fr : Saraba : nous avons bien reçu votre demande
  - en : Saraba: we've received your request
- `book.mail.confirmIntro`
  - fr : Bonjour {name}, ⏎  ⏎ Merci pour votre demande de réservation au Saraba. La voici :
  - en : Hello {name}, ⏎  ⏎ Thank you for your booking request at Saraba. Here it is:
- `book.mail.confirmOutro`
  - fr : Nous vous confirmons la table très vite, par téléphone ou par e-mail. Pour toute question : 03 22 45 17 69. ⏎  ⏎ À bientôt rue des Majots, ⏎ L'équipe du Saraba ⏎ 13 rue des Majots, 80000 Amiens
  - en : We'll confirm your table very soon, by phone or email. Any questions: +33 3 22 45 17 69. ⏎  ⏎ See you soon on rue des Majots, ⏎ The Saraba team ⏎ 13 rue des Majots, 80000 Amiens, France

### reviews

- `reviews.eyebrow`
  - fr : Vos avis
  - en : Your reviews
- `reviews.title`
  - fr : Ce que l'on retient de vos soirées
  - en : What you remember from your evenings
- `reviews.themes.0`
  - fr : Le mafé
  - en : The mafé
- `reviews.themes.1`
  - fr : L'impression de voyage
  - en : The feeling of travelling
- `reviews.themes.2`
  - fr : Le sourire de l'accueil
  - en : The smiling welcome
- `reviews.themes.3`
  - fr : Les spécialités
  - en : The house specialities
- `reviews.themes.4`
  - fr : Le doggy bag
  - en : The doggy bag
- `reviews.themesLead`
  - fr : Ce qui revient le plus souvent dans vos avis Google :
  - en : What comes up most often in your Google reviews:
- `reviews.count`
  - fr : {count} avis Google
  - en : {count} Google reviews
- `reviews.checked`
  - fr : Note relevée le {date}.
  - en : Rating noted on {date}.
- `reviews.cta`
  - fr : Lire les avis sur Google
  - en : Read the reviews on Google
- `reviews.empty`
  - fr : Bientôt ici : quelques-uns de vos avis, avec votre accord.
  - en : Coming soon: a few of your reviews, with your permission.

### infos

- `infos.eyebrow`
  - fr : Infos pratiques
  - en : Practical info
- `infos.title`
  - fr : Nous trouver
  - en : Find us
- `infos.address`
  - fr : Adresse
  - en : Address
- `infos.directions`
  - fr : Itinéraire
  - en : Directions
- `infos.phone`
  - fr : Téléphone
  - en : Phone
- `infos.access`
  - fr : Accès
  - en : Getting here
- `infos.accessText`
  - fr : Dans le quartier Saint-Leu, à deux pas de l'église Saint-Leu et à dix minutes à pied de la cathédrale.
  - en : In the Saint-Leu quarter, a stone's throw from Saint-Leu church and a ten-minute walk from the cathedral.
- `infos.parking`
  - fr : Stationnement
  - en : Parking
- `infos.parkingText`
  - fr : Les rues de Saint-Leu sont en partie piétonnes : garez-vous dans un parking du centre-ville et finissez à pied.
  - en : Saint-Leu's streets are partly pedestrian: park in a city-centre car park and finish on foot.
- `infos.accessibility`
  - fr : Accessibilité
  - en : Accessibility
- `infos.accessibilityText`
  - fr : Salle accessible aux personnes à mobilité réduite.
  - en : Wheelchair-accessible dining room.
- `infos.payment`
  - fr : Paiement
  - en : Payment
- `infos.paymentText`
  - fr : Espèces, carte bancaire et sans contact.
  - en : Cash, bank card and contactless.
- `infos.hours`
  - fr : Horaires
  - en : Opening hours
- `infos.hoursNote`
  - fr : Fermetures exceptionnelles annoncées en haut du site.
  - en : Exceptional closures are announced at the top of the site.
- `infos.days.0`
  - fr : Lundi
  - en : Monday
- `infos.days.1`
  - fr : Mardi
  - en : Tuesday
- `infos.days.2`
  - fr : Mercredi
  - en : Wednesday
- `infos.days.3`
  - fr : Jeudi
  - en : Thursday
- `infos.days.4`
  - fr : Vendredi
  - en : Friday
- `infos.days.5`
  - fr : Samedi
  - en : Saturday
- `infos.days.6`
  - fr : Dimanche
  - en : Sunday
- `infos.closed`
  - fr : Fermé
  - en : Closed
- `infos.mapTitle`
  - fr : Plan d'accès au Saraba, 13 rue des Majots, Amiens
  - en : Map to Saraba, 13 rue des Majots, Amiens

### status

- `status.open`
  - fr : Ouvert maintenant
  - en : Open now
- `status.until`
  - fr : jusqu'à {time}
  - en : until {time}
- `status.closed`
  - fr : Fermé
  - en : Closed
- `status.opens`
  - fr : ouvre {day} à {time}
  - en : opens {day} at {time}
- `status.today`
  - fr : aujourd'hui
  - en : today
- `status.tomorrow`
  - fr : demain
  - en : tomorrow

### faq

- `faq.eyebrow`
  - fr : Questions fréquentes
  - en : FAQ
- `faq.title`
  - fr : Bon à savoir
  - en : Good to know
- `faq.items.0.q`
  - fr : Faut-il réserver ?
  - en : Do I need to book?
- `faq.items.0.a`
  - fr : C'est conseillé, surtout le vendredi et le samedi : la salle est petite. Réservez en ligne ou appelez le 03 22 45 17 69.
  - en : It's a good idea, especially on Fridays and Saturdays: the dining room is small. Book online or call +33 3 22 45 17 69.
- `faq.items.1.q`
  - fr : Quels sont vos horaires ?
  - en : What are your opening hours?
- `faq.items.1.a`
  - fr : Le Saraba est ouvert le soir, du mardi au samedi, de 19 h à minuit. Fermé le dimanche et le lundi.
  - en : Saraba is open in the evening, Tuesday to Saturday, from 7 pm to midnight. Closed on Sundays and Mondays.
- `faq.items.2.q`
  - fr : Peut-on emporter les plats ?
  - en : Can I take dishes away?
- `faq.items.2.a`
  - fr : Oui : mafé, yassa et bœuf curry sont à 12 € à emporter. Appelez pour commander. Les poissons se dégustent sur place. Et si vous n'avez pas fini votre assiette, on vous prépare un doggy bag.
  - en : Yes: mafé, yassa and beef curry are €12 to take away. Call us to order. Fish is served in the restaurant only. And if you can't finish your plate, we'll give you a doggy bag.
- `faq.items.3.q`
  - fr : Accueillez-vous les groupes et les anniversaires ?
  - en : Do you welcome groups and birthdays?
- `faq.items.3.a`
  - fr : Avec plaisir. À partir de 8 personnes, faites une demande en indiquant l'occasion : nous vous rappelons pour organiser la table et le repas.
  - en : Gladly. From 8 guests, send a request and mention the occasion: we'll call you back to organise the table and the meal.
- `faq.items.4.q`
  - fr : Quels moyens de paiement acceptez-vous ?
  - en : How can I pay?
- `faq.items.4.a`
  - fr : Espèces, carte bancaire et paiement sans contact.
  - en : Cash, bank card and contactless.
- `faq.items.5.q`
  - fr : Comment venir et où se garer ?
  - en : How do I get there and where can I park?
- `faq.items.5.a`
  - fr : Nous sommes au 13 rue des Majots, dans le quartier Saint-Leu, près de l'église. Le quartier est en partie piéton : le plus simple est de se garer dans un parking du centre-ville et de finir à pied.
  - en : We're at 13 rue des Majots, in the Saint-Leu quarter, near the church. The area is partly pedestrian, so the easiest is to park in a city-centre car park and walk the last few minutes.

### footer

- `footer.tagline`
  - fr : Restaurant africain à Saint-Leu, Amiens. Cuisine sénégalaise et spécialités d'Afrique de l'Ouest, le soir du mardi au samedi.
  - en : African restaurant in Saint-Leu, Amiens. Senegalese cooking and West African specialities, Tuesday to Saturday evenings.
- `footer.rights`
  - fr : © {year} Saraba Restaurant Africain
  - en : © {year} Saraba Restaurant Africain
- `footer.legal`
  - fr : Mentions légales
  - en : Legal notice
- `footer.menu`
  - fr : La carte
  - en : The menu
- `footer.gift`
  - fr : Bon cadeau
  - en : Gift voucher
- `footer.pages`
  - fr : À découvrir
  - en : Discover
- `footer.africain`
  - fr : Restaurant africain à Amiens
  - en : African restaurant in Amiens
- `footer.mafe`
  - fr : Mafé à Amiens
  - en : Mafé in Amiens

### pages

- `pages.carte.metaTitle`
  - fr : La carte et les prix | Saraba, restaurant africain à Amiens
  - en : Menu and prices | Saraba, African restaurant in Amiens
- `pages.carte.metaDescription`
  - fr : La carte du Saraba avec les prix : accras, pastels, mafé de bœuf, yassa poulet, thiou gombo, bar ou dorade selon l'arrivage. Plats à emporter à 12 €.
  - en : Saraba's menu with prices: accras, pastels, beef mafé, chicken yassa, thiou with okra, sea bass or sea bream of the day. Takeaway dishes at €12.
- `pages.carte.title`
  - fr : La carte
  - en : The menu
- `pages.africain.metaTitle`
  - fr : Restaurant africain à Amiens, quartier Saint-Leu | Saraba
  - en : African restaurant in Amiens, Saint-Leu quarter | Saraba
- `pages.africain.metaDescription`
  - fr : Envie de cuisine africaine à Amiens ? Le Saraba, rue des Majots à Saint-Leu, sert mafé, yassa et poisson grillé du mardi au samedi soir. Réservez en ligne.
  - en : Looking for African food in Amiens? Saraba, on rue des Majots in Saint-Leu, serves mafé, yassa and grilled fish Tuesday to Saturday evenings. Book online.
- `pages.africain.eyebrow`
  - fr : Restaurant africain · Amiens
  - en : African restaurant · Amiens
- `pages.africain.title`
  - fr : Un restaurant africain au cœur de Saint-Leu
  - en : An African restaurant in the heart of Saint-Leu
- `pages.africain.lead`
  - fr : Au 13 rue des Majots, le Saraba cuisine chaque soir les grands plats d'Afrique de l'Ouest, avec une préférence pour le Sénégal.
  - en : At 13 rue des Majots, Saraba cooks the great dishes of West Africa every evening, with a soft spot for Senegal.
- `pages.africain.sections.0.h`
  - fr : Une cuisine sénégalaise, généreuse et mijotée
  - en : Generous, slow-cooked Senegalese food
- `pages.africain.sections.0.p`
  - fr : Mafé de bœuf à l'arachide, yassa poulet au citron et aux oignons, thiou au gombo, bœuf curry : des plats qui prennent leur temps, servis copieusement. En entrée, accras, alokos et pastels se partagent volontiers.
  - en : Beef mafé in peanut sauce, chicken yassa with lemon and onions, thiou with okra, beef curry: dishes that take their time, served generously. To start, accras, alokos and pastels are made for sharing.
- `pages.africain.sections.1.h`
  - fr : Dans le quartier Saint-Leu
  - en : In the Saint-Leu quarter
- `pages.africain.sections.1.p`
  - fr : La salle est petite et chaleureuse : murs de bambou, masques sculptés, ardoise écrite à la main. On y vient entre amis, en famille ou à deux, et beaucoup repartent avec l'envie de revenir, ou avec un doggy bag.
  - en : The dining room is small and warm: bamboo walls, carved masks, a handwritten chalkboard. People come with friends, family or as a couple, and many leave wanting to come back, or with a doggy bag.
- `pages.africain.sections.2.h`
  - fr : Le soir, du mardi au samedi
  - en : Evenings, Tuesday to Saturday
- `pages.africain.sections.2.p`
  - fr : Le Saraba ouvre de 19 h à minuit, du mardi au samedi. Le week-end, mieux vaut réserver : en ligne en deux minutes ou au 03 22 45 17 69.
  - en : Saraba is open from 7 pm to midnight, Tuesday to Saturday. At weekends it's best to book: online in two minutes or on +33 3 22 45 17 69.
- `pages.mafe.metaTitle`
  - fr : Mafé à Amiens : le mafé de bœuf du Saraba, rue des Majots
  - en : Mafé in Amiens: Saraba's beef mafé, rue des Majots
- `pages.mafe.metaDescription`
  - fr : Où manger un bon mafé à Amiens ? Au Saraba, le mafé de bœuf à l'arachide est la spécialité de la maison : 14 € sur place, 12 € à emporter.
  - en : Where to eat great mafé in Amiens? At Saraba, beef mafé in peanut sauce is the house speciality: €14 to eat in, €12 to take away.
- `pages.mafe.eyebrow`
  - fr : Mafé · Amiens
  - en : Mafé · Amiens
- `pages.mafe.title`
  - fr : Le mafé du Saraba
  - en : Saraba's mafé
- `pages.mafe.lead`
  - fr : C'est le plat dont on parle le plus dans les avis : un mafé de bœuf mijoté dans une sauce à l'arachide, servi généreusement.
  - en : It's the dish reviewers mention most: beef mafé slow-cooked in a peanut sauce, served generously.
- `pages.mafe.sections.0.h`
  - fr : Qu'est-ce que le mafé ?
  - en : What is mafé?
- `pages.mafe.sections.0.p`
  - fr : Le mafé est un plat d'Afrique de l'Ouest, très populaire au Sénégal et au Mali : une viande mijotée longuement dans une sauce à base de pâte d'arachide et de tomate. Au Saraba, il se décline aussi en mafé gombo.
  - en : Mafé is a West African dish, very popular in Senegal and Mali: meat slowly simmered in a sauce of peanut paste and tomato. At Saraba it also comes as okra mafé.
- `pages.mafe.sections.1.h`
  - fr : Sur place ou à emporter
  - en : Eat in or take away
- `pages.mafe.sections.1.p`
  - fr : Le mafé de bœuf est à 14 € en salle et à 12 € à emporter. Pour l'emporter, appelez-nous au 03 22 45 17 69 : il sera prêt à votre arrivée.
  - en : Beef mafé is €14 in the restaurant and €12 to take away. To take it home, call us on +33 3 22 45 17 69 and it will be ready when you arrive.
- `pages.mafe.sections.2.h`
  - fr : Et pour l'accompagner
  - en : What goes with it
- `pages.mafe.sections.2.p`
  - fr : Commencez par des accras ou des alokos, et finissez sur un fondant au chocolat. Les curieux goûteront ensuite le yassa poulet ou le thiou gombo.
  - en : Start with accras or alokos and finish with a chocolate fondant. Next time, try the chicken yassa or the thiou with okra.
- `pages.gift.metaTitle`
  - fr : Bon cadeau | Saraba, restaurant africain à Amiens
  - en : Gift voucher | Saraba, African restaurant in Amiens
- `pages.gift.metaDescription`
  - fr : Offrez un dîner au Saraba, restaurant africain rue des Majots à Amiens : bon cadeau du montant de votre choix, à retirer au restaurant.
  - en : Treat someone to dinner at Saraba, African restaurant on rue des Majots in Amiens: a gift voucher for the amount you choose, collected at the restaurant.
- `pages.gift.eyebrow`
  - fr : Bon cadeau
  - en : Gift voucher
- `pages.gift.title`
  - fr : Offrir un dîner au Saraba
  - en : Give a dinner at Saraba
- `pages.gift.lead`
  - fr : Pour un anniversaire, un merci ou l'envie de faire découvrir le mafé : offrez un bon cadeau du montant de votre choix.
  - en : For a birthday, a thank-you or to introduce someone to mafé: give a gift voucher for the amount you choose.
- `pages.gift.steps.0.h`
  - fr : Appelez-nous
  - en : Call us
- `pages.gift.steps.0.p`
  - fr : Dites-nous le montant et le nom de la personne à qui vous l'offrez.
  - en : Tell us the amount and the name of the person it's for.
- `pages.gift.steps.1.h`
  - fr : Passez le chercher
  - en : Collect it
- `pages.gift.steps.1.p`
  - fr : Le bon vous attend au restaurant, à régler sur place, le soir du mardi au samedi.
  - en : Your voucher waits for you at the restaurant, paid on site, Tuesday to Saturday evening.
- `pages.gift.steps.2.h`
  - fr : Offrez
  - en : Give it
- `pages.gift.steps.2.p`
  - fr : Il ne reste plus qu'à réserver une table. Valable sur toute la carte.
  - en : All that's left is to book a table. Valid on the whole menu.
- `pages.gift.note`
  - fr : Pas de paiement en ligne : tout se règle au restaurant.
  - en : No online payment: everything is paid at the restaurant.
- `pages.legal.metaTitle`
  - fr : Mentions légales | Saraba
  - en : Legal notice | Saraba
- `pages.legal.title`
  - fr : Mentions légales
  - en : Legal notice
- `pages.legal.editor`
  - fr : Éditeur du site
  - en : Publisher
- `pages.legal.editorText`
  - fr : Saraba Restaurant Africain, 13 rue des Majots, 80000 Amiens. Téléphone : 03 22 45 17 69.
  - en : Saraba Restaurant Africain, 13 rue des Majots, 80000 Amiens, France. Phone: +33 3 22 45 17 69.
- `pages.legal.company`
  - fr : Société
  - en : Company
- `pages.legal.rcs`
  - fr : Immatriculation
  - en : Registration
- `pages.legal.siret`
  - fr : SIRET
  - en : SIRET
- `pages.legal.director`
  - fr : Directeur de la publication
  - en : Publication director
- `pages.legal.host`
  - fr : Hébergement
  - en : Hosting
- `pages.legal.data`
  - fr : Données personnelles
  - en : Personal data
- `pages.legal.dataText`
  - fr : Les informations envoyées par le formulaire de réservation servent uniquement à traiter votre demande. Elles sont transmises par e-mail au restaurant et ne sont pas stockées sur le site. Vous pouvez demander leur suppression en écrivant ou en appelant le restaurant.
  - en : Information sent through the booking form is only used to handle your request. It is emailed to the restaurant and not stored on the site. You can ask for it to be deleted by writing to or calling the restaurant.
- `pages.legal.cookies`
  - fr : Cookies
  - en : Cookies
- `pages.legal.cookiesText`
  - fr : Le site n'utilise ni cookie publicitaire ni outil de mesure d'audience. Seul un petit cookie retient la langue choisie. La carte Google Maps n'est chargée que lorsque vous descendez jusqu'à elle.
  - en : The site uses no advertising cookies and no analytics. A small cookie only remembers your language. The Google Maps map only loads when you scroll down to it.
- `pages.legal.photos`
  - fr : Photos
  - en : Photos
- `pages.legal.photosText`
  - fr : Photos du restaurant. Toute reproduction est interdite sans accord.
  - en : Photos of the restaurant. Do not reproduce without permission.
- `pages.legal.pending`
  - fr : À compléter
  - en : To be completed

### alt


## Textes alternatifs des photos

- `salle-ardoise-nuit` · fr : La salle du Saraba le soir : murs de bambou, masques sculptés et l'ardoise du jour devant la fenêtre · en : Saraba's dining room at night: bamboo walls, carved masks and the day's chalkboard by the window
- `ardoise-plats` · fr : L'ardoise du Saraba : mafé bœuf, yassa poulet, thiou gombo, mafé gombo et bœuf curry · en : Saraba's chalkboard: beef mafé, chicken yassa, thiou with okra, okra mafé and beef curry
- `salle-masques-bambou` · fr : Masques sculptés sur les murs de bambou de la salle du Saraba · en : Carved masks on the bamboo walls of Saraba's dining room
- `chevalet-rue` · fr : Le chevalet du Saraba dans la rue, devant les pierres de l'église Saint-Leu · en : Saraba's street chalkboard, in front of the stones of Saint-Leu church
