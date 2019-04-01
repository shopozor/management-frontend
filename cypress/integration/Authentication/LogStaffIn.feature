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

  En plus de ça, pour laisser le contrôle au Rex sur les nouveaux membres du staff, l'interface 
  administrateur ne propose pas d'enregistrer de nouveaux utilisateurs. Un nouvel utilisateur s'enregistre 
  en temps que client sur l'interface du Consommateur puis notifie le Rex de son envie d'agir en 
  tant que Producteur ou Responsable.

  <img src="LogStaffIn.feature.gif" alt="Démo" width="1000" height="660"/>

  Contexte: L'utilisateur n'est pas identifié
    Etant donné un utilisateur non identifié

  Scénario: L'utilisateur accède à l'interface admin

    L'accès à l'interface administrateur envoie par défaut l'utilisateur vers un formulaire 
    d'identification. Aucun lien d'enregistrement n'est proposé pour les utilisateurs sans 
    identifiants.

    Lorsqu'un utilisateur accède à l'interface admin
    Alors il doit s'identifier 
    Et n'a pas accès à un menu utilisateur
    Et n'a pas accès à un lien pour s'enregistrer

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

    Exemples: 
      | membre      |
      | Producteur  |
      | Responsable |
      | Rex         |
      | Softozor    |

  Scénario: Un Consommateur ne peut pas s'identifier
    Lorsqu'un Consommateur s'identifie avec un e-mail et un mot de passe valides 
    Alors il obtient un message d'erreur stipulant que son compte n'a pas les droits d'administrateur