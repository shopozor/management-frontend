# language: fr

@initial-release @login
Fonctionnalité: Identifier un membre du staff

  En tant qu'utilisateur enregistré dans le Shopozor avec des droits de gestion (i.e. "membre du staff"),  
  je veux pouvoir m'identifier avec un e-mail et un mot de passe,  
  afin d'obtenir les droits d'accès liés à mon compte. 
  
  Les utilisateurs suivants sont membres du "staff" (**TODO: ajouter lien vers le glossaire!**):

    * Producteur
    * Responsable
    * Rex
    * Softozor

  Contexte: L'utilisateur n'est pas identifié
    Etant donné un utilisateur non identifié sur l'interface d'identification

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
    Alors sa session sécurisée s'ouvre pour 1 mois
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