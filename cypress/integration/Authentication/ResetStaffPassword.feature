# language: fr

@initial-release @auth @wip
Fonctionnalité: Le membre du staff réinitialise son mot de passe 

  *En tant que membre du staff,  
  je veux pouvoir réinitialiser mon mot de passe  
  lorsque je l'ai oublié.*  
  
  Plan du Scénario: Le membre du staff fait une demande de réinitialisation de mot de passe 

    Ceci correspond à l'utilisation normale de la fonctionnalité: un membre enregistré 
    a oublié son mot de passe et fait une demande de réinitialisation.

    Lorsqu'un <membre> enregistré fait une demande de réinitialisation de mot de passe 
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

    Exemples:
      | membre       |
      | Producteur   |
      | Responsable  |
      | Rex          |
      | Softozor     |

  @HackerAbuse
  Scénario: Un utilisateur inconnu fait une demande de réinitialisation de mot de passe 

    Rien n'empêche quiconque de faire une demande de réinitialisation de mot de passe. Si 
    un utilisateur inconnu fait une telle demande, alors nous le traitons en surface comme 
    s'il était enregistré car nous voulons éviter de lui donner des informations sur les comptes 
    existants dans le système. 

    Lorsqu'un utilisateur inconnu fait une demande de réinitialisation de son mot de passe 
    Alors il obtient un message stipulant qu'un e-mail lui a été transmis

  @not-e2e
  Plan du Scénario: Le membre du staff définit un mot de passe conforme dans les temps

    Le lien de réinitialisation de mot de passe a une durée de vie limitée.

    # Tester ce scénario "end-to-end" pourrait être techniquement possible. Il faudrait 
    # mettre en place mailtrap et consulter cette boîte mail durant le test. Dans une 
    # première phase, nous ne considérons pas ce scénario durant les test e2e.

    Etant donné un <membre> qui consulte son lien de réinitialisation de mot de passe dans les temps
    Lorsqu'il valide un mot de passe conforme
    Alors il obtient un message stipulant que son mot de passe a été modifié avec succès
    
    Exemples:
      | membre       |
      | Producteur   |
      | Responsable  |
      | Rex          |
      | Softozor     |

  @not-e2e
  Plan du Scénario: Le membre du staff définit son mot de passe une deuxième fois avec le même lien

    Le lien de réinitialisation de mot de passe n'est valide qu'une seule fois.
    
    # Tester ce scénario "end-to-end" pourrait être techniquement possible. Il faudrait 
    # mettre en place mailtrap et consulter cette boîte mail durant le test. Dans une 
    # première phase, nous ne considérons pas ce scénario durant les test e2e.

    Etant donné un <membre> qui a reçu un lien de réinitialisation de mot de passe
    Et qui a déjà réinitialisé son mot de passe avec ce lien
    Lorsqu'il le réinitialise pour la deuxième fois
    Alors il obtient un message d'erreur stipulant que le lien a expiré
    
    Exemples:
      | membre       |
      | Producteur   |
      | Responsable  |
      | Rex          |
      | Softozor     |

    @not-e2e
    Plan du Scénario: Le membre du staff définit son mot de passe trop tard 
    
      En plus de n'être utilisable qu'une seule fois, le lien expire après un certain temps. 
      Dans ce cas, le mot de passe de l'utilisateur reste inchangé. Il a toujours la possibilité 
      de refaire une demande de réinitialisation pour obtenir un nouveau lien.  

      # Tester ce scénario "end-to-end" n'est pas raisonnable car il faudrait en principe 
      # attendre suffisamment longtemps pour que le lien expire. Il est possible de faire 
      # avancer le temps durant les tests côté serveur mais durant les tests e2e c'est plus 
      # compliqué. Il faudrait théoriquement avoir une méthode dans l'api du serveur pour lui 
      # avancer son temps, ce qui est faisable mais demande du travail dont la plus-value est 
      # discutable.
      
      Etant donné un <membre> qui a reçu un lien de réinitialisation de mot de passe
      Lorsqu'il définit un mot de passe conforme trop tard 
      Alors il obtient un message d'erreur stipulant que le lien a expiré

      Exemples:
        | membre       |
        | Producteur   |
        | Responsable  |
        | Rex          |
        | Softozor     |