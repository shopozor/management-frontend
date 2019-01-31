# language: fr

@initial-release @login
Fonctionnalité: Identifier un membre du staff

  En tant que membre du staff enregistré dans le Shopozor
  je veux pouvoir m'identifier avec un e-mail et un mot de passe,  
  afin d'obtenir les droits d'accès liés à mon compte. 

  Par défaut, le token d'identification est stocké dans le local storage. 
  Dans ce cas, l'utilisateur est déconnecté à chaque fois qu'il quitte le Shopozor. 
  Si l'utilisateur accepte l'utilisation des cookies, 
  alors le token d'identification est stocké dans un cookie et sa session reste ouverte 
  durant l'intervalle de temps spécifié dans les scénarios ci-dessous.

  Contexte: L'utilisateur n'est pas identifié
    Etant donné un utilisateur non identifié

  Scénario: Le membre du staff n'est pas encore enregistré
    Lorsqu'un utilisateur s'identifie avec un e-mail et un mot de passe invalides
    Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects

  Plan du Scénario: Le membre du staff est enregistré mais entre un mot de passe erroné
    Lorsqu'un <membre> s'identifie avec un e-mail valide et un mot de passe invalide
    Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects

    Exemples: 
      | membre      |
      | Producteur  |
      | Responsable |
      | Rex         |
      | Softozor    |

  Plan du Scénario: Le membre du staff est enregistré et connaît son mot de passe

    Le token d'identification reçu par le serveur a une certaine validité (e.g. un mois), 
    quelle que soit sa politique de stockage dans l'application client. Si l'utilisateur 
    n'accepte pas les cookies, alors son application client va l'oublier à la fermeture du navigateur, 
    ce qui va l'empêcher de communiquer avec le serveur, même si le token n'y a pas été invalidé. 
    L'utilisateur devra donc s'identifier à nouveau.

    Lorsqu'un <membre> s'identifie avec un e-mail et un mot de passe valides
    Alors sa session s'ouvre pour 1 mois
    Et il ne peut plus accéder à l'interface d'identification
    Et son token d'identification est stocké dans le local storage

    Exemples: 
      | membre      |
      | Producteur  |
      | Responsable |
      | Rex         |
      | Softozor    |

  Scénario: Un Consommateur ne peut pas s'identifier
    Lorsqu'un Consommateur s'identifie avec un e-mail et un mot de passe valides 
    Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects