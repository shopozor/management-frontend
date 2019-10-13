# language: fr

@initial-release @login
Fonctionnalité: Accès à l'interface administrateur

  *En tant que Rex  
  je veux analyser les dossiers des utilisateurs intéressés à rejoindre le staff,  
  afin de modérer le Shopozor et organiser les Shops au mieux.*  

  Un nouvel utilisateur s'enregistre en temps que client sur l'interface du Consommateur 
  puis notifie le Rex de son envie d'agir en tant que Producteur ou Responsable.

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

  Scénario: Un Consommateur ne peut pas s'identifier
    Lorsqu'un Consommateur s'identifie avec un e-mail et un mot de passe valides 
    Alors il obtient un message d'erreur stipulant que son compte n'a pas les droits d'administrateur