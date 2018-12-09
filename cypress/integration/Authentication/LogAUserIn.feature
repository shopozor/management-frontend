# language: fr

@initial-release @login
Fonctionnalité: Identifier un utilisateur

  En tant qu'utilisateur enregistré dans le Shopozor avec des droits de gestion,  
  je veux pouvoir m'identifier avec un e-mail et un mot de passe,  
  afin d'obtenir les droits d'accès liés à mon compte. 
  
  Les utilisateurs suivants ont les droits nécessaires (**TODO: ajouter lien vers le glossaire!**):

    * Producteur
    * Responsable
    * Rex
    * Softozor

  Contexte: L'utilisateur n'est pas identifié
    Etant donné un utilisateur non identifié sur l'interface d'identification

  Scénario: L'utilisateur n'est pas encore enregistré
    Lorsqu'un utilisateur s'identifie avec un e-mail et un mot de passe invalides
    Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects

  Scénario: L'utilisateur est enregistré mais entre un mot de passe erroné
    Lorsqu'un utilisateur s'identifie avec un e-mail valide et un mot de passe invalide
    Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects

  Scénario: L'utilisateur est enregistré et connaît son mot de passe
    Lorsqu'un utilisateur s'identifie avec un e-mail et un mot de passe valides
    Alors sa session s'ouvre pour 1 mois
    Et il ne peut plus accéder à l'interface d'identification

  # Double-check that the session cookie is there with correct expiry date