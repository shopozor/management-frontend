import types from '../../types'

export default {
  shop: 'La Budzonnerie',
  management: 'gestion',
  welcome: 'Bienvenue',
  dialog: {
    warning: 'Attention !'
  },
  actions: {
    ok: 'Valider',
    cancel: 'Annuler',
    save: 'Enregistrer'
  },
  links: {
    [types.links.SIGNUP]: 'S\'inscrire',
    [types.links.LOGIN]: 'Se connecter',
    [types.links.LOGOUT]: 'Se déconnecter',
    [types.links.PROFILE]: 'Profil',
    [types.links.HOME]: 'Accueil',
    [types.links.FAKE_SHOP]: 'Fausse budzonnerie',
    [types.links.MAP]: 'Carte',
    [types.links.CALENDAR]: 'Calendrier',
    [types.links.ORDERS]: 'Commandes',
    [types.links.PRODUCTS]: 'Produits',
    [types.links.MY_SHOP]: 'Ma Budzonnerie',
    [types.links.MANAGE_SHOPS]: 'Gestion des Budzonneries',
    [types.links.MANAGE_SITE]: 'Gestion du Site'
  },
  aisle: {
    [types.aisle.DAIRY]: 'produits laitiers',
    [types.aisle.MEAT]: 'viande',
    [types.aisle.FRUITS]: 'fruits',
    [types.aisle.VEGETABLES]: 'légumes',
    [types.aisle.GROCERY]: 'épicerie'
  },
  conservation: {
    [types.conservation.BASEMENT]: 'à la cave',
    [types.conservation.FRIDGE]: 'au frigo',
    [types.conservation.FREEZER]: 'au congélateur'
  },
  profile: {
    email: 'e-mail',
    password: 'mot de passe'
  },
  signup: {
    repeatPassword: 'répétez votre mot de passe',
    createAccount: 'Créer mon compte',
    emailHelper: {
      valid: 'ceci sera votre nom de budzon',
      invalid: 'veillez entrer un e-mail valide'
    },
    passwordHelper: {
      valid: '6 caractères ou plus',
      invalid: 'il manque 1 caractère | il manque {count} caractères'
    },
    confirmPasswordHelper: {
      valid: 'pour éviter les erreurs de frappe',
      invalid: 'les deux mots de passe sont différents'
    },
    correctErrors: 'Veuillez corriger les erreurs.'
  },
  login: {
    stayLoggedIn: 'rester connecté',
    connect: 'se connecter',
    forgotPassword: 'J\'ai oublié mon mot de passe'
  },
  layout: {
    notConnected: 'non connecté'
  },
  products: {
    edit: 'éditer',
    inventory: 'inventaire',
    trash: 'corbeille',
    visible: 'Produit en vente',
    hidden: 'Produit caché',
    warningHide: 'Vous êtes sur le point de cacher un produit avec {amount} commandes en cours pour un total de {price} francs payés par les clients. Vous devrez dédommager vos clients si vous ne les livrez pas.',
    hide: 'Cacher',
    letVisible: 'Laisser visible',
    warningDeleteWithoutOrders: 'Vous êtes sur le point de mettre un produit à la corbeille. Il pourra être restauré pendant six mois. Passé ce délai, il sera définitvement effacé.',
    warningDeleteWithOrders: 'Vous êtes sur le point d\'effacer un produit. Ses formats seront aussi effacés. Il pourra être restauré pendant six mois, mais sera définitivement effacé par la suite. ATTENTION: Ce produit comporte {amount} commandes en cours pour un total de {price} francs payés par les clients. Vous devrez dédommager vos clients si vous ne les livrez pas.',
    throwAway: 'Jeter',
    keep: 'Conserver',
    ordersSummary: 'Aucune commande en cours | Une commande: {price} francs | {amount} commandes: {price} francs',
    name: 'Nom du produit',
    description: 'Description du produit',
    aisle: 'Rayon',
    conservationMethod: 'Méthode de conservation',
    conservationTime: 'Durée de conservation',
    day: 'jour | jour | jours'
  }
}
