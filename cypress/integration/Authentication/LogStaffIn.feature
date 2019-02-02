# language: fr

@initial-release @login
Fonctionnalité: Identifier un membre du staff

  *En tant que membre du staff enregistré dans le Shopozor
  je veux pouvoir m'identifier avec un e-mail et un mot de passe,  
  afin d'obtenir les droits d'accès liés à mon compte.*  

  A la création de son compte, l'utilisateur est averti de l'utilisation de cookies 
  qui sont incontournables pour garantir une identification sécurisée. 
  Comme le compte de l'utilisateur n'est pas créé si celui-ci n'accepte pas notre politique des cookies, 
  les scénarios ci-dessous ne traitent que le cas où le token d'identification est stocké dans un cookie.

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
    Lorsqu'un <membre> s'identifie avec un e-mail et un mot de passe valides
    Alors sa session s'ouvre pour 1 mois
    Et il ne peut plus accéder à l'interface d'identification

    Exemples: 
      | membre      |
      | Producteur  |
      | Responsable |
      | Rex         |
      | Softozor    |

  Scénario: Un Consommateur ne peut pas s'identifier
    Lorsqu'un Consommateur s'identifie avec un e-mail et un mot de passe valides 
    Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects