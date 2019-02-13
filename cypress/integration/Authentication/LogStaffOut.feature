# language: fr

@initial-release @common @login
Fonctionnalité: Déconnecter un membre du staff 

  *En tant que membre du staff connecté au Shopozor,  
  je veux pouvoir m'en déconnecter  
  de telle sorte que je doive entrer mes identifiants à nouveau pour m'y reconnecter.*  

  @current
  Plan du Scénario: Le membre du staff est connecté
    Etant donné un <membre> connecté au Shopozor 
    Lorsqu'il se déconnecte
    Alors sa session se ferme
    Et il est redirigé vers l'interface d'identification

    Exemples:
      | membre      | 
      | Producteur  |
      | Responsable |
      | Rex         |
      | Softozor    |