import gsap from 'gsap';
import { Object3D, Camera } from 'three';
import { getSquareWorldPosition, getCameraPosition } from '../utils/boardCoordinates';

export class AnimationManager {
  masterTimeline: gsap.core.Timeline = gsap.timeline();

  animateDiceRoll(diceObject: Object3D): gsap.core.Timeline {
    const timeline = gsap.timeline();

    timeline
      .to(
        diceObject.rotation,
        {
          x: Math.random() * 10,
          y: Math.random() * 10,
          z: Math.random() * 10,
          duration: 0.8,
          ease: 'power2.out',
        },
        0
      )
      .to(
        diceObject.scale,
        {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 0.3,
          ease: 'back.out',
        },
        0
      )
      .to(
        diceObject.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.2,
        },
        0.5
      )
      .to(
        diceObject.position,
        {
          y: 0.3,
          duration: 0.4,
          ease: 'power2.out',
        },
        0
      )
      .to(
        diceObject.position,
        {
          y: 0,
          duration: 0.2,
        },
        0.4);

    return timeline;
  }

  animatePieceMovement(
    piece: Object3D,
    camera: Camera,
    _fromSquare: number,
    toSquare: number,
    duration: number = 1.5
  ): gsap.core.Timeline {
    const toPos = getSquareWorldPosition(toSquare);
    const toCameraPos = getCameraPosition(toSquare);

    const timeline = gsap.timeline();

    timeline
      .to(
        piece.position,
        {
          x: toPos.x,
          z: toPos.z,
          duration,
          ease: 'power2.inOut',
        } as any,
        0
      )
      .to(
        camera.position,
        {
          x: toCameraPos.x,
          z: toCameraPos.z,
          duration: duration * 1.05,
          ease: 'power1.inOut',
        } as any,
        -0.05
      )
      .to(
        piece.rotation,
        {
          x: 0.1,
          duration: 0.2,
          ease: 'sine.inOut',
        },
        duration
      )
      .to(
        piece.rotation,
        {
          x: 0,
          duration: 0.1,
        },
        duration + 0.2);

    return timeline;
  }

  animateSnakeSlide(
    piece: Object3D,
    camera: Camera,
    _fromSquare: number,
    toSquare: number
  ): gsap.core.Timeline {
    const toPos = getSquareWorldPosition(toSquare);
    const timeline = gsap.timeline();

    timeline
      .to({}, { duration: 0.3 } as any)
      .to(
        piece.position,
        {
          x: toPos.x,
          z: toPos.z,
          y: -0.2,
          duration: 0.8,
          ease: 'power2.in',
          onUpdate: () => {
            camera.position.copy(piece.position);
            camera.position.y = 1.5;
          },
        } as any,
        0.3
      )
      .to(
        piece.position,
        {
          y: 0,
          duration: 0.1,
        },
        1.1
      )
      .to(
        camera.position,
        {
          x: camera.position.x + 0.05,
          duration: 0.05,
        },
        1.1
      )
      .to(
        camera.position,
        {
          x: camera.position.x - 0.1,
          duration: 0.05,
        },
        1.15
      )
      .to(
        camera.position,
        {
          x: camera.position.x + 0.05,
          duration: 0.05,
        },
        1.2);

    return timeline;
  }

  animateLadderClimb(
    piece: Object3D,
    camera: Camera,
    _fromSquare: number,
    toSquare: number
  ): gsap.core.Timeline {
    const toPos = getSquareWorldPosition(toSquare);
    const timeline = gsap.timeline();

    timeline
      .to({}, { duration: 0.2 } as any)
      .to(
        piece.position,
        {
          x: toPos.x,
          z: toPos.z,
          y: 0.5,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: () => {
            camera.position.copy(piece.position);
            camera.position.y = 1.5;
          },
        } as any,
        0.2
      )
      .to(
        piece.position,
        {
          y: 0,
          duration: 0.15,
        },
        1.0
      )
      .to(
        piece.position,
        {
          y: 0.05,
          duration: 0.05,
        },
        1.15);

    return timeline;
  }

  animateWinSequence(camera: Camera, duration: number = 3): gsap.core.Timeline {
    const timeline = gsap.timeline();

    timeline.to(
      camera.position,
      {
        y: 5,
        duration: duration * 0.6,
        ease: 'power2.out',
      },
      0
    );

    return timeline;
  }
}
