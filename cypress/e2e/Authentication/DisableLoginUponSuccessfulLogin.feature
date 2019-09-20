# language: fr

@initial-release @login
Fonctionnalité: Condamner l'accès à l'interface d'identification à l'utilisateur identifié

  *En tant que Shopozor,  
  je ne veux pas permettre à un utilisateur identifié l'accès à l'interface d'identification  
  pour garantir la sécurité de ses données ainsi que le bon déroulement de sa navigation.*  

  Beaucoup d'événements peuvent se passer au moment de l'identification et de la déconnexion d'un utilisateur, 
  notamment certaines opérations de nettoyage de données. Si un utilisateur peut s'identifier alors qu'il est 
  déjà identifié, il est probable que les données relatives à son compte se retrouvent dans un état indéfini. 
  C'est pourquoi il faut empêcher à un utilisateur identifié d'accéder à l'interface d'identification. 

  Plan du Scénario: Une fois la session ouverte, l'interface d'identification n'est plus accessible
    Etant donné un <membre> identifié 
    Lorsqu'il accède à l'interface admin
    Alors il est redirigé vers la page d'accueil

    Exemples: 
      | membre      |
      | Producteur  |
      | Responsable |
      | Rex         |
      | Softozor    |